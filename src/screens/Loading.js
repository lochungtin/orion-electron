import React from 'react';
import { connect } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';

import NavBar from '../components/NavBar';
import FileSystem from '../utils/FileSystem';

class Screen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
            loading: true,
            progress: 0,
            processes: 1,
            prompt: '',
            start: false,
            state: 'waiting ...',
        }

        this.fs = new FileSystem();
        this.loading(1);
    }

    copyAll = (from, to, arr) => arr.forEach((dir, index) =>
        dir.forEach(file => {
            this.fs.copy(from + this.fs.separator + this.props.lcl.plan[index], to + this.fs.separator + this.props.lcl.plan[index], file);
            this.setState({ counter: this.state.counter + 1 });
        })
    );

    deleteAll = (root, arr) => arr.forEach((dir, index) =>
        dir.forEach(file => {
            this.fs.delete(root + this.fs.separator + this.props.lcl.plan[index] + this.fs.separator + file);
            this.setState({ counter: this.state.counter + 1 });
        })
    );


    loading = val => {
        const progress = (val + 1) % 100;
        if (this.state.loading) {
            this.setState({ progress });
            setTimeout(() => this.loading(progress), 100);
        }
    }

    start = () => {
        this.setState({ state: 'calculating ...' });
        if (this.props.act !== 'remote') {
            let localFiles = [];
            let remoteFiles = [];

            // scan directories from plan
            this.props.lcl.plan.forEach(dir => {
                let local = [];
                let remote = [];

                this.fs.scanDir(
                    this.props.acc.rootDir + this.fs.separator + dir,
                    this.props.lcl.device + this.fs.separator + dir,
                    file => local.push(file),
                    file => remote.push(file),
                    this.props.act === 'sync',
                );

                localFiles.push(local);
                remote.push(remote);
            });

            let processes = 1;
            localFiles.forEach(dir => processes += dir.length);
            remoteFiles.forEach(dir => processes += dir.length);
            this.setState({ processes });

            this.setState({ start: true });
            switch (this.props.act) {
                case 'clone':
                    this.deleteAll(this.props.acc.rootDir, localFiles);
                    this.copyAll(this.props.lcl.device, this.props.acc.rootDir, remoteFiles);
                    break;

                case 'overwrite':
                    this.deleteAll(this.props.lcl.device, remoteFiles);
                    this.copyAll(this.props.acc.rootDir, this.props.lcl.device, localFiles);
                    break;

                default:
                    this.copyAll(this.props.acc.rootDir, this.props.lcl.device, localFiles);
                    this.copyAll(this.props.lcl.device, this.props.acc.rootDir, remoteFiles);
                    break;
            }
            this.setState({ counter: 1, processes: 1, prompt: 'Backup Complete', state: '' });
        }
    }

    render() {
        return (
            <>
                <NavBar>
                    <p>
                        {`Plan: ${this.props.act}`}
                    </p>
                </NavBar>
                <div className='content'>
                    <div className='loadingProgressContainer'>
                        <CircularProgressbar
                            className='loadingProgressCircle'
                            value={this.state.start ? this.state.counter / this.state.processes * 100 : this.state.progress}
                            strokeWidth={1}
                            styles={{
                                path: {
                                    stroke: '#e6b329',
                                    strokeLinecap: 'round',
                                },
                                trail: {
                                    stroke: '#1e1e1e',
                                },
                            }}
                        />
                        <p className='loadingProgressText'>
                            {this.state.state || parseInt(this.state.counter / this.state.processes * 100) + '%'}
                        </p>
                        {!this.state.start ?
                            <button className='loadingStartBtn' onClick={this.start}>
                                <p>start</p>
                            </button> :
                            <p className='loadingText'>
                                {this.state.prompt}
                            </p>
                        }
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    acc: state.acc,
    act: state.act,
    lcl: state.lcl,
});

export default connect(mapStateToProps)(Screen);