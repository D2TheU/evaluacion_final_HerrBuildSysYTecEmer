import React from 'react';
import { Link } from 'react-router-dom';
import * as request from 'superagent';

import style from '../assets/css/navbar.css';

import { isObjectEmpty, objectLength } from './helpers/helpers.jsx'

class Navbar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        let badge = [];
        if (objectLength(this.props.shoppingCart) > 0) {
            badge.push(
                <span className="badge badge-pill badge-danger" key="kart_badge">{objectLength(this.props.shoppingCart)}</span>
            );
        }
        return (
            <div className="navbar sticky-top navbar-light bg-light navbar-expand">
                <Link to="/dashboard">La Bodega</Link>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/dashboard"><img src="/assets/img/ic_dashboard.svg"/></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/cart"><img src="/assets/img/ic_shopping.svg"/>{badge}</Link>

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
}

export default Navbar;
