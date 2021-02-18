import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';

import FileSystem from '../utils/FileSystem';
import Check from '../img/icon/check.png';
import Folder from '../img/icon/folder.png';
import Plus from '../img/icon/plus.png';
import Refresh from '../img/icon/refresh.png';
import Unchecked from '../img/icon/unchecked.png';

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
                    <p className='noselect mainLogo'>orion</p>
                    <div>
                        <button className='mainStartBtnContainer'>
                            <img className='noselect mainStartBtn' src={Plus} alt='start' />
                        </button>
                        <button className='mainStartBtnContainer'>
                            <img className='noselect mainStartBtn' src={Refresh} alt='start' />
                        </button>
                    </div>
                </div>
                <div className='mainContent'>
                    {this.fs.getCurDir(this.props.acc.rootDir).map(dir => {
                        return (
                            <div className='mainDir' key={dir}>
                                <img className='noselect mainFolderIcon' src={Folder} alt='folder' />
                                <p className='noselect mainFolderText'>{dir}</p>
                                <button>
                                    <img className='noselect mainCheckbox' src={Unchecked} alt='checkbox' />
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
    dev: state.dev,
    fs: state.fs,
});

export default connect(mapStateToProps)(Main);