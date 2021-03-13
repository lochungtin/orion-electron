import axios from 'axios';
import React from 'react';

import { makeClient } from '../client';
import Lock from '../img/icon/lock.png';
import PC from '../img/icon/pc.png';
import Server from '../img/icon/server.png';
import User from '../img/icon/user.png';

import { setClient, setDevice, setLocalFS, setLogin, } from '../redux/action';
import { store } from '../redux/store';
import FileSystem from '../utils/FileSystem';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            account: {},
            address: '192.168.1.119',
            devices: [],
            password: '14709832',
            prompt: '',
            select: {},
            state: 'connect',
            username: 'enigma',
        }

        this.handleAddr = this.handleAddr.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePswd = this.handlePswd.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleAddr = event => this.setState({ address: event.target.value });

    handleEmail = event => this.setState({ username: event.target.value });

    handlePswd = event => this.setState({ password: event.target.value });

    handleSelect = event => this.setState({ select: event.target.value });

    login = () => {
        if (this.state.state === 'login') {
            const dev = JSON.parse(this.state.select);

            let fs = new FileSystem();
            fs.setDebug(false);

            store.dispatch(setLocalFS(fs.getCurDir(dev.rootDir)));
            store.dispatch(setClient(makeClient(this.state.address)));
            store.dispatch(setDevice(dev));
            store.dispatch(setLogin(this.state.account));
        }
        else {
            axios.get(`http://${this.state.address}:42070/accounts/`)
                .then(res => {
                    var account = res.data.filter(acc => acc.username === this.state.username)[0];
                    if (account) {
                        if (account.password === this.state.password)
                            axios.get(`http://${this.state.address}:42070/devices/`)
                                .then(res => {
                                    const devices = res.data.filter(dev => dev.uid === account._id)
                                    this.setState({ account, devices, prompt: '', state: 'login' })
                                });
                        else
                            this.setState({ prompt: 'Incorrect Password' });
                    }
                    else
                        this.setState({ prompt: 'Account Doesn\'t Exist' });
                });
        }
    }

    render() {
        return (
            <div className='loginRoot'>
                <div className='loginStrip'>
                    <p className='noselect loginText'>
                        orion.
                    </p>
                    <div style={{ height: '2vh' }} />

                    {this.state.state === 'login' ?
                        <>
                            <div style={{ height: '2vh' }} />
                            <p className='noselect loginInputLabel'>
                                Select Registered Device
                            </p>
                            <div className='loginInputBox'>
                                <img
                                    alt='logo'
                                    className='noselect loginIcons'
                                    src={PC}
                                />
                                <select className='loginSelect' onChange={this.handleSelect}>
                                    {this.state.devices.map(dev => {
                                        return (
                                            <option
                                                className='loginOption'
                                                key={dev._id}
                                                value={JSON.stringify(dev)}
                                            >
                                                {dev.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </> :
                        <>
                            <p className='noselect loginInputLabel'>
                                Server Address
                            </p>
                            <div className='loginInputBox'>
                                <img
                                    alt='logo'
                                    className='noselect loginIcons'
                                    src={Server}
                                />
                                <input
                                    className='loginInput'
                                    onChange={this.handleAddr}
                                    placeholder='Type your Raspberry PI address'
                                    type='text'
                                />
                            </div>
                            <p className='noselect loginInputLabel'>
                                Username
                            </p>
                            <div className='loginInputBox'>
                                <img
                                    alt='logo'
                                    className='noselect loginIcons'
                                    src={User}
                                />
                                <input
                                    className='loginInput'
                                    onChange={this.handleEmail}
                                    placeholder='Type your username'
                                    type='text'
                                />
                            </div>
                            <p className='noselect loginInputLabel'>
                                Password
                            </p>
                            <div className='loginInputBox'>
                                <img
                                    alt='logo'
                                    className='noselect loginIcons'
                                    src={Lock}
                                />
                                <input
                                    className='loginInput'
                                    onChange={this.handlePswd}
                                    placeholder='Type your password'
                                    type='password'
                                />
                            </div>
                        </>
                    }

                    <div style={{ height: '3vh' }} />

                    <p>
                        {this.state.prompt}
                    </p>
                    <div style={{ height: '3vh' }} />

                    <button className='loginBtn' onClick={this.login}>
                        <p>
                            {this.state.state}
                        </p>
                    </button>
                    <div style={{ height: '5vh' }} />
                </div>
            </div>
        )
    }
}
