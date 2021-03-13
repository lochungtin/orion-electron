import React from 'react';
import { connect } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';

import NavBar from '../components/NavBar';

class Screen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            progress: 0,
            prompt: 'prompt text'
        }

        this.loading(1);
    }

    loading = val => {
        const progress = (val + 1) % 100;
        if (this.state.loading) {
            this.setState({ progress });
            setTimeout(() => this.loading(progress), 100);
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
                            value={this.state.progress}
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
                            {'calculating ...'}
                        </p>
                        <p className='loadingText'>
                            {this.state.prompt}
                        </p>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    act: state.act,
});

export default connect(mapStateToProps)(Screen);