import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from '../screens/Login';

import { setLogout } from '../redux/action';
import { store } from '../redux/store';

class AppNav extends React.Component {

    logout = () => {
        store.dispatch(setLogout());
        window.location = 'http://localhost:3000/'
    }

    render() {
        return (
            <>
                {this.props.acc === null ?
                    <div className='root'>
                        <Login />
                    </div> :
                    <Router>
                        
                    </Router>
                }
            </>
        );
    }
}

const mapStateToProps = state => ({
    acc: state.acc
});

export default connect(mapStateToProps)(AppNav);