import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';

import NavBarBtn from '../components/NavBarBtn';
import Check from '../img/icon/check.png';
import Folder from '../img/icon/folder.png';
import FolderR from '../img/icon/folderR.png';
import Unchecked from '../img/icon/unchecked.png';
import Drive from '../img/icon/drive.png';
import Plus from '../img/icon/plus.png';
import PlusS from '../img/icon/plusS.png';
import Save from '../img/icon/save.png';
import StartRemote from '../img/icon/refresh.png';

import { setRemoteFS } from '../redux/action';
import { store } from "../redux/store";

class Screen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            addList: [],
            remote: false,
            subList: [],
        }
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
            <>
                <NavBar>
                    <NavBarBtn icon={this.state.remote ? PlusS : Plus} />
                    <NavBarBtn icon={Save} />
                    <NavBarBtn icon={StartRemote} to={'/loading'} />
                    <NavBarBtn icon={Drive} to={'/local'}/>
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
                    {this.state.remote && this.props.fs.root.remote.filter(dir => !this.props.fs.root.local.includes(dir)).map(dir => {
                        return (
                            <div className='mainDir' key={dir}>
                                <img
                                    alt='folder'
                                    className='noselect mainFolderIcon'
                                    src={FolderR}
                                />
                                <p className='noselect mainFolderText'>
                                    {'[r] ' + dir}
                                </p>
                                <button onClick={() => this.toggleAddList(dir)}>
                                    <img
                                        alt='checkbox'
                                        className='noselect mainCheckbox'
                                        src={this.state.addList.includes(dir) ? Check : Unchecked}
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

export default connect(mapStateToProps)(Screen);