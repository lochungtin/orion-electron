import React from 'react';
import { connect } from 'react-redux';

import NavBar from '../components/NavBar';

class Screen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <NavBar>
                    <p>
                        {`Plan: ${this.props.act}`}
                    </p>
                </NavBar>
                <div className='content'>
                    
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    act: state.act,
});

export default connect(mapStateToProps)(Screen);