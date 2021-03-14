import React from 'react';

import NavBar from '../components/NavBar';
import NavBarBtn from '../components/NavBarBtn';
import Drive from '../img/icon/driveS.png';
import Refresh from '../img/icon/sync.png';
import Start from '../img/icon/start.png';

import FileSystem from '../utils/FileSystem';
import { setDeviceLocal } from '../redux/action';
import { withRouter } from 'react-router-dom';
import { store } from '../redux/store';

class Screen extends React.Component {

    constructor(props) {
        super(props);

        this.fs = new FileSystem();

        this.state = {
            drive: '',
            drives: this.fs.getLocalDevices()
        }
    }

    refresh = () => this.setState({ drives: this.fs.getLocalDevices() });

    selectDrive = drive => this.setState({ drive: this.state.drive === drive ? '' : drive });

    start = () => {
        store.dispatch(setDeviceLocal(this.state.drive));
        this.props.history.push('/loading');
    }

    render() {
        return (
            <>
                <NavBar>
                    <NavBarBtn icon={Refresh} onClick={this.refresh} />
                    <NavBarBtn icon={Start} onClick={this.start} />
                </NavBar>
                <div className='content'>
                    <div className='deviceTopTextContainer col'>
                        <p className='noselect deviceTopText'>
                            Select a target drive
                        </p>
                    </div>
                    <div className='deviceDriveContainer'>
                        {this.state.drives.map(dev => {
                            const splt = dev.split(this.fs.separator);
                            return (
                                <button key={dev} onClick={() => this.selectDrive(dev)}>
                                    <div className='deviceDrive' style={this.state.drive === dev ? { opacity: 1 } : undefined}>
                                        <img
                                            alt='drive'
                                            className='noselect deviceDriveImg'
                                            src={Drive}
                                        />
                                        <p className='noselect deviceDriveName'>
                                            {splt[splt.length - 1]}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Screen);
