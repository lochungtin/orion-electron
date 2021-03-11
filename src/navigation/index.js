import React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Redirect, Route, Switch, } from 'react-router-dom';
import Local from '../screens/Local';

import Login from '../screens/Login';
import Main from '../screens/Main';

import { setLocalFS } from '../redux/action';
import { store } from "../redux/store";
import FileSystem from '../utils/FileSystem';

class AppNav extends React.Component {

    constructor(props) {
        super(props);

        this.fs = new FileSystem();
        this.fs.setDebug(false);

        store.dispatch(setLocalFS(this.fs.getCurDir(props.dev.rootDir)));
    }

    render() {
        return this.props.acc === null ? <Login /> :
            <HashRouter>
                <Switch>
                    <Route exact path='/' render={() => <Redirect to='/main' />}/>
                    <div>
                        <Route exact path='/main' render={() => <Main />} />
                        <Route exact path='/local' render={() => <Local />} />
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