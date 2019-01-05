import React, { Component } from 'react';

// stateless component

class NavBar extends Component {
    render() { 
        return (
        <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="#">
            <span className='badge badge-pill badge-secondary'>
            Total Numbers above zero {this.props.totalNumbers}
            </span>
            </a>
        </nav> );
    }
}
 
export default NavBar;