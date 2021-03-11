import React from 'react';
import { Link } from 'react-router-dom';

export default class NavBarBtn extends React.Component {
    render() {
        return (
            <>
                {this.props.to ?
                    <Link className='navBtn' to={this.props.to}>
                        <img
                            alt='icon'
                            className='noselect navBtnIcon'
                            src={this.props.icon}
                        />
                    </Link> :
                    <button className='navBtn' onClick={this.props.onClick}>
                        <img
                            alt='icon'
                            className='noselect navBtnIcon'
                            src={this.props.icon}
                        />
                    </button>
                }
            </>
        );
    }
}