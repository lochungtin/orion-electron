import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch, } from 'react-router-dom';
import DeviceSelection from '../screens/DeviceSelection';

import Loading from '../screens/Loading';
import Local from '../screens/Local';
import Login from '../screens/Login';
import Main from '../screens/Main';

class AppNav extends React.Component {

    render() {
        return this.props.acc === null ? <Login /> :
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' render={() => <Redirect to='/main' />}/>
                    <div>
                        <Route exact path='/main' render={() => <Main />} />
                        <Route exact path='/local' render={() => <Local />} />
                        <Route exact path='/device' render={() => <DeviceSelection />} />
                        <Route exact path='/loading' render={() => <Loading />} />
                    </div>
                </Switch>
                <div className='mainBottomBar'>
                    <p className='noselect mainLoginText'>
                        {`Logged In As: ${this.props.dev.name}`}
                    </p>
                </div>
            </BrowserRouter>
    }
}

const mapStateToProps = state => ({
    acc: state.acc,
    dev: state.dev
});

export default connect(mapStateToProps)(AppNav);