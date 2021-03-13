import React from 'react';
import { connect } from 'react-redux';

import NavBar from '../components/NavBar';
import NavBarBtn from '../components/NavBarBtn';
import Check from '../img/icon/check.png';
import Clone from '../img/icon/clone.png';
import DriveS from '../img/icon/driveS.png';
import Folder from '../img/icon/folder.png';
import Unchecked from '../img/icon/unchecked.png';
import Overwrite from '../img/icon/overwrite.png';
import Sync from '../img/icon/sync.png';
import { store } from '../redux/store';
import { setAction } from '../redux/action';
import { withRouter } from 'react-router-dom';

class Screen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            subList: [],
        }
    }

    startBackup = type => {
        store.dispatch(setAction(type));
        this.props.history.push('/device');
    }

    toggleSubList = dir => {
        let subList = [...this.state.subList];
        if (subList.includes(dir))
            subList.splice(subList.indexOf(dir), 1);
        else
            subList.push(dir);
        this.setState({ subList });
    }

    render() {
        return (
            <>
                <NavBar>
                    <NavBarBtn icon={Clone} onClick={() => this.startBackup('clone')}/>
                    <NavBarBtn icon={Sync} />
                    <NavBarBtn icon={Overwrite} />
                    <NavBarBtn icon={DriveS} to={'/main'}/>
                </NavBar>
                <div className='content'>
                    {this.props.fs.root.local.map(dir => {
                        return (
                            <div className='mainDir' key={dir}>
                                <img className='noselect mainFolderIcon' src={Folder} alt='folder' />
                                <p className='noselect mainFolderText'>
                                    {dir}
                                </p>
                                <button onClick={() => this.toggleSubList(dir)}>
                                    <img
                                        alt='checkbox'
                                        className='noselect mainCheckbox'
                                        src={this.state.subList.includes(dir) ? Check : Unchecked}
                                    />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    acc: state.acc,
    clt: state.clt,
    dev: state.dev,
    fs: state.fs,
});

export default withRouter(connect(mapStateToProps)(Screen));