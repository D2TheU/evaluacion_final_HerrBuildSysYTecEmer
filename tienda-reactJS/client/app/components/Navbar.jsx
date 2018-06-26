import React from 'react';
import { Link } from 'react-router-dom';
import * as request from 'superagent';

import style from '../assets/css/navbar.css';

class Navbar extends React.Component {

    constructor() {
        super()
        this.login = this.login.bind(this);
        this.state = {

        }
    }

    render() {
        return (
            <div className="navbar sticky-top navbar-light bg-light navbar-expand">
                <Link to="/dashboard">La Bodega</Link>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/dashboard"><img src="/assets/img/ic_dashboard.svg"/></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/cart"><img src="/assets/img/ic_shopping.svg"/></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/dashboard"><img src="/assets/img/ic_inbox.svg"/></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/"><img src="/assets/img/ic_logout.svg"/></Link>
                    </li>
                </ul>
            </div>
        )
    }

    login() {

    }
}

export default Navbar;
