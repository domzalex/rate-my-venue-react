import React from 'react'
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <nav>
            <NavLink to="/" className="home-link">RateMyVenue</NavLink>
            <div id="nav-link-container">
                <NavLink to="/login" className="nav-link">login</NavLink>
                <NavLink to="/contact" className="nav-link">contact</NavLink>
            </div>
        </nav>
    )
}

export default Nav;