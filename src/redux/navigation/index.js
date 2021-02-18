import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from '../screens/Login';

class AppNav extends React.Component {

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