import React from 'react';
import { connect } from 'react-redux';

import Login from '../screens/Login';
import Main from '../screens/Main';

class AppNav extends React.Component {

    render() {
        return this.props.acc === null ? <Login /> : <Main />;
    }
}

const mapStateToProps = state => ({
    acc: state.acc
});

export default connect(mapStateToProps)(AppNav);