import React from 'react';
import { Link } from 'react-router-dom';
import * as request from 'superagent';

import style from '../assets/css/dashboard.css';

import Navbar from './Navbar.jsx';

class ShoppingCart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        return (
            <div className="container-fluid fill-height dashboard-container">
                <div className="container no-padding-sides">
                    <Navbar shoppingCart={this.state.shoppingCart}/>
                </div>
            </div>
        )
    }
}

export default ShoppingCart;
