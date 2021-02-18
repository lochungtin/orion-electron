import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';

import FileSystem from '../utils/FileSystem';
import Check from '../img/icon/check.png';
import Refresh from '../img/icon/refresh.png';
import Unchecked from '../img/icon/unchecked.png';
import Folder from '../img/icon/folder.png';

class Main extends React.Component {

    constructor(props) {
        super(props);

        this.fs = new FileSystem();
        this.fs.setDebug(false);
    }

    render() {
        return (
            <div>
                <div className='mainTopBar'>
                    <p className='mainLogo'>orion</p>
                    <button className='mainStartBtnContainer'>
                        <img className='mainStartBtn' src={Refresh} alt='start'/>
                    </button>
                </div>
                <div className='mainContent'>
                    {this.fs.getCurDir(this.props.acc.rootDir).map(dir => {
                        return (
                            <div className='mainDir' key={dir}>
                                <img className='mainFolderIcon' src={Folder} alt='folder' />
                                <p className='mainFolderText'>{dir}</p>
                                <button>
                                    <img className='mainCheckbox' src={Unchecked} alt='checkbox' />
                                </button>
                            </div>
                        );
                    })}
                </div>
                <div className='mainBottomBar'>
                    <p className='mainLoginText'>{`Logged In As: ${this.props.dev.name}`}</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    acc: state.acc,
    dev: state.dev,
    fs: state.fs,
});

export default connect(mapStateToProps)(Main);