import React from 'react'
import { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'

class MainMenu extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className='navbar-brand' to='/'>
                        NotesApp
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <NavLink className='nav-link' exact to='/'>Note</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='nav-link' to='/user'>Create User</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='nav-link' to='/create'>Create Note</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
export default MainMenu