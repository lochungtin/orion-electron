import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';

import Check from '../img/icon/check.png';
import Folder from '../img/icon/folder.png';
import FolderR from '../img/icon/folderR.png';
import Plus from '../img/icon/plus.png';
import PlusS from '../img/icon/plusS.png';
import Refresh from '../img/icon/refresh.png';
import Unchecked from '../img/icon/unchecked.png';
import { setLocalFS, setRemoteFS, } from '../redux/action';
import { store } from "../redux/store";
import FileSystem from '../utils/FileSystem';

class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            addList: [],
            remote: false,
            subList: [],
        }

        this.fs = new FileSystem();
        this.fs.setDebug(false);

        store.dispatch(setLocalFS(this.fs.getCurDir(props.dev.rootDir)));
    }

    toggleAddList = dir => {
        let addList = [...this.state.addList];
        if (addList.includes(dir))
            addList.splice(addList.indexOf(dir), 1);
        else
            addList.push(dir);
        this.setState({ addList });
    }

    toggleRemote = () => {
        this.setState({ remote: !this.state.remote });
        if (!this.state.remote)
            this.props.clt.send('get' + this.props.acc.rootDir);
        else {
            store.dispatch(setRemoteFS([]));
            this.setState({ addList: [] });
        }
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
            <div>
                <div className='mainTopBar'>
                    <p className='noselect mainLogo'>orion</p>
                    <div className='mainStartBtnContainer'>
                        <button className='mainStartBtn' onClick={this.toggleRemote}>
                            <img className='noselect mainStartBtnIcon' src={this.state.remote ? PlusS : Plus} alt='start' />
                        </button>
                        <button className='mainStartBtn'>
                            <img className='noselect mainStartBtnIcon' src={Refresh} alt='start' />
                        </button>
                    </div>
                </div>
                <div className='mainContent'>
                    {this.props.fs.root.local.map(dir => {
                        return (
                            <div className='mainDir' key={dir}>
                                <img className='noselect mainFolderIcon' src={Folder} alt='folder' />
                                <p className='noselect mainFolderText'>{dir}</p>
                                <button onClick={() => this.toggleSubList(dir)}>
                                    <img className='noselect mainCheckbox' src={this.state.subList.includes(dir) ? Check : Unchecked} alt='checkbox' />
                                </button>
                            </div>
                        );
                    })}
                    {this.state.remote && this.props.fs.root.remote.filter(dir => !this.props.fs.root.local.includes(dir)).map(dir => {
                        return (
                            <div className='mainDir' key={dir}>
                                <img className='noselect mainFolderIcon' src={FolderR} alt='folder' />
                                <p className='noselect mainFolderText'>{'[r] ' + dir}</p>
                                <button onClick={() => this.toggleAddList(dir)}>
                                    <img className='noselect mainCheckbox' src={this.state.addList.includes(dir) ? Check : Unchecked} alt='checkbox' />
                                </button>
                            </div>
                        );
                    })}
                </div>
                <div className='mainBottomBar'>
                    <p className='noselect mainLoginText'>{`Logged In As: ${this.props.dev.name}`}</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    acc: state.acc,
    clt: state.clt,
    dev: state.dev,
    fs: state.fs,
});

export default connect(mapStateToProps)(Main);