import React from 'react';
import { Link } from 'react-router-dom';
import * as request from 'superagent';

import style from '../assets/css/dashboard.css';

import Navbar from './Navbar.jsx';

class Dashboard extends React.Component {

    constructor() {
        super()
        this.createCatalog = this.createCatalog.bind(this);
        this.state = {

        }
    }

    render() {
        return (

            <div className="container-fluid fill-height dashboard-container">
                <div className="container">
                    <Navbar />
                    <div className="row no-margin-sides product-container">
                        <div className="col-12 top-content">
                            <div className="row">
                                <div className="col-md-9 title-container">
                                    <h1>Catálogo de productos</h1>
                                </div>
                                <div className="col-md-3 search-container">
                                    <p>¿Qué estás buscando?</p>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="search_addon"><img src="/assets/img/ic_search.svg"/></span>
                                        </div>
                                        <input type="text" className="form-control" id="search"/>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div className="col-12 catalog-content">
                            {this.createCatalog()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    createCatalog() {
        var products = [
            {
                'name': 'Aguacates',
                'file': 'aguacate.jpg',
                'price': 5,
                'cuantity': 46
            },
            {
                'name': 'Ajo',
                'file': 'ajo.jpg',
                'price': 2,
                'cuantity': 78
            },
            {
                'name': 'Almendras',
                'file': 'almendras.jpg',
                'price': 8,
                'cuantity': 29
            },
            {
                'name': 'Arándanos',
                'file': 'arandanos.jpg',
                'price': 6,
                'cuantity': 39
            },
            {
                'name': 'Brócoli',
                'file': 'brocoli.png',
                'price': 10,
                'cuantity': 87
            }
        ];
        let rows = Math.ceil(products.length/4);
        let catalog = [];
        for (var i = 0; i < rows; i++) {
            var htmlProducts = [];
            for (var j = 0; j < 4; j++) {
                if (products[(3*i)+j] !== undefined) {
                    htmlProducts.push(
                        <div className="card col-md-3" key={'card-' + ((3*i)+j)}>
                            <img className="card-img-top" src={'/assets/img/' + products[(3*i)+j].file} alt="Card image cap" />
                            <div className="card-body no-padding-sides">
                                <h5 className="card-title">{products[(3*i)+j].name}</h5>
                                <p className="card-text"><strong>Precio: </strong>${products[(3*i)+j].price}</p>
                                <p className="card-text"><strong>Unidades disponibles: </strong>{products[(3*i)+j].cuantity}</p>
                                <a href="#" className="btn btn-primary">Ver más</a>
                            </div>
                        </div>
                    )
                } else {
                    continue;
                }
            }
            catalog.push(
                <div className="row no-margin-sides" key={i}>{htmlProducts}</div>
            );
        }

        return catalog;
    }
}

export default Dashboard;
