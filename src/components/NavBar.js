import React from 'react';

export default class NavBar extends React.Component {
    render() {
        return (
            <div className='navTopBar'>
                <p className='noselect navLogo'>
                    orion
                </p>
                <div className='navBtnContainer'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}