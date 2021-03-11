import React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Link, Redirect, Route, Switch } from 'react-router-dom';

import Login from '../screens/Login';
import Main from '../screens/Main';

class AppNav extends React.Component {
    render() {
        return this.props.acc === null ? <Login /> :
            <HashRouter>
                <Switch>
                    <Route
                        exact
                        path='/'
                        render={() => <Redirect to='/main' />}
                    />
                    <div>
                        <Route exact path='/main' render={() => <Main />} />
                        <Route exact path='/local' />
                    </div>
                </Switch>
                <div className='mainBottomBar'>
                    <p className='noselect mainLoginText'>
                        {`Logged In As: ${this.props.dev.name}`}
                    </p>
                </div>
            </HashRouter>
    }
}

const mapStateToProps = state => ({
    acc: state.acc,
    dev: state.dev
});

export default connect(mapStateToProps)(AppNav);