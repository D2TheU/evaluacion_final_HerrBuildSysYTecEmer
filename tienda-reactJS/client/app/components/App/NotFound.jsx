import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div className="container-fluid login-container">
        <div className="row vertical-center">
            <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h2>Página no encontrada</h2>

                <Link to="/">Ir a login</Link>
            </div>
        </div>
    </div>
);

export default NotFound;
