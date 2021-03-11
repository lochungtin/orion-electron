import React from 'react';

export default class NavBarBtn extends React.Component {
    render() {
        return (
            <button className='navBtn' onClick={this.props.onClick}>
                <img
                    alt='icon'
                    className='noselect navBtnIcon'
                    src={this.props.icon}
                />
            </button>
        );
    }
}