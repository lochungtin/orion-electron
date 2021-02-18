import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';

class Main extends React.Component {

    render() {
        return (
            <div>
                <p>asdfasdfasdfasdfasdf</p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    fs: state.fs,
});

export default connect(mapStateToProps)(Main);