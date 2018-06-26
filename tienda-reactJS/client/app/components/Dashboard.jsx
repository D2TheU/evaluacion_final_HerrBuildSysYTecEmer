import React from 'react';
import { Link } from 'react-router-dom';
import * as request from 'superagent';

import style from '../assets/css/dashboard.css';

import Navbar from './Navbar.jsx';

class Dashboard extends React.Component {

    constructor() {
        super()
        this.login = this.login.bind(this);
        this.state = {

        }
    }

    render() {
        return (

            <div className="container-fluid dashboard-container">
                <div className="container">
                    <Navbar />
                    <div className="row fill-height">
                        <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        hola
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    login() {

    }
}

export default Dashboard;
