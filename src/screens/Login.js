import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';

import { makeClient } from '../client';
import Lock from '../img/icon/lock.png';
import PC from '../img/icon/pc.png';
import Server from '../img/icon/server.png';
import User from '../img/icon/user.png';
import { setClient, setLogin, } from '../redux/action';
import { store } from '../redux/store';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            account: {},
            address: '',
            devices: [],
            password: '',
            state: 'connect ',
            username: '',
        }

        this.handleAddr = this.handleAddr.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePswd = this.handlePswd.bind(this);
    }

    handleAddr = event => this.setState({ address: event.target.value });

    handleEmail = event => this.setState({ username: event.target.value });

    handlePswd = event => this.setState({ password: event.target.value });

    login = () => {
        if (this.state.state === 'login') {
            const client = makeClient(this.state.address);
            store.dispatch(setLogin(this.state.account));
            store.dispatch(setClient(client));
        }
        else {
            axios.get(`http://${this.state.address}:42070/accounts/`)
                .then(res => {
                    var account = res.data.filter(acc => acc.username === this.state.username)[0];
                    if (account) {
                        if (account.password === this.state.password)
                            axios.get(`http://${this.state.address}:42070/devices/`)
                                .then(res => this.setState({ account, devices: res.data, state: 'login' }));
                    }
                });
        }
    }

    render() {
        return (
            <div className='loginRoot'>
                <div className='loginStrip'>
                    <p className='noselect loginText'>orion.</p>
                    <div style={{ height: '2vh' }} />

                    {this.state.state === 'login' ?
                        <>
                            <p className='noselect loginInputLabel'>Select Registered Device</p>
                            <div className='loginInputBox'>
                                <img className='noselect loginIcons' src={PC} alt='logo' />
                                <select className='loginSelect'>
                                    {this.state.devices.map(dev => {
                                        return (
                                            <option className='loginOption'>
                                                {dev.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </> :
                        <>
                            <p className='noselect loginInputLabel'>Server Address</p>
                            <div className='loginInputBox'>
                                <img className='noselect loginIcons' src={Server} alt='logo' />
                                <input className='loginInput' type='text' placeholder='Type your Raspberry PI address' onChange={this.handleAddr} />
                            </div>
                            <p className='noselect loginInputLabel'>Username</p>
                            <div className='loginInputBox'>
                                <img className='noselect loginIcons' src={User} alt='logo' />
                                <input className='loginInput' type='text' placeholder='Type your username' onChange={this.handleEmail} />
                            </div>
                            <p className='noselect loginInputLabel'>Password</p>
                            <div className='loginInputBox'>
                                <img className='noselect loginIcons' src={Lock} alt='logo' />
                                <input className='loginInput' type='password' placeholder='Type your password' onChange={this.handlePswd} />
                            </div>
                        </>}

                    <div style={{ height: '6vh' }} />

                    <button className='loginBtn' onClick={this.login}>
                        <p>{this.state.state}</p>
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    str: state.str,
})

export default connect(mapStateToProps)(Login);