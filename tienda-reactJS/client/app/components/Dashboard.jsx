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
            filter: '',
            products: {
                'aguacate': {
                    'name': 'Aguacate',
                    'file': 'aguacate.jpg',
                    'price': 5,
                    'quantity': 46,
                    'count' : 1
                },
                'ajo': {
                    'name': 'Ajo',
                    'file': 'ajo.jpg',
                    'price': 2,
                    'quantity': 78,
                    'count' : 1
                },
                'almendras': {
                    'name': 'Almendras',
                    'file': 'almendras.jpg',
                    'price': 8,
                    'quantity': 29,
                    'count' : 1
                },
                'arándanos': {
                    'name': 'Arándanos',
                    'file': 'arandanos.jpg',
                    'price': 6,
                    'quantity': 39,
                    'count' : 1
                },
                'brócoli': {
                    'name': 'Brócoli',
                    'file': 'brocoli.png',
                    'price': 10,
                    'quantity': 87,
                    'count' : 1
                }
            }
        }
    }

    onAddChange(e) {
        let value = e.target.value;
        if (value > 0) {
            let product = e.target.id.substr(6);
            let products = Object.assign({}, this.state.products);    //creating copy of object
            products[product].count = value;                        //updating value
            this.setState({products});
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
        let catalog = [];
        let row = [];

        for(var product in this.state.products){
            if (this.state.filter != '' && product.indexOf(this.state.filter) == -1) {
                continue;
            }
            row.push(
                <div className="card col-md-3" key={'card-' + product}>
                    <img className="card-img-top" src={'/assets/img/' + this.state.products[product].file} alt="Card image cap" />
                    <div className="card-body no-padding-sides">
                        <h5 className="card-title">{this.state.products[product].name}</h5>
                        <p className="card-text"><strong>Precio: </strong>${this.state.products[product].price}</p>
                        <p className="card-text"><strong>Unidades disponibles: </strong>{this.state.products[product].quantity}</p>
                        <div className="row no-margin-sides card-bottom">
                            <div className="col-sm-5 col-md-12 col-lg-5 no-padding-sides">
                                <button className="btn btn-primary">Ver más</button>
                            </div>
                            <div className="col-sm-7 col-md-12 col-lg-7 no-padding-sides">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <button className="btn btn-outline-secondary" type="button" id={"count_" + this.state.products[product].name.toLowerCase()}>Añadir</button>
                                    </div>
                                    <input type="number" className="form-control" id={"input_" + this.state.products[product].name.toLowerCase()} value={this.state.products[product].count} onChange={e => this.onAddChange(e)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
            if (row.length % 4 == 0) {
                catalog.push(
                    <div className="row no-margin-sides" key={row.length}>{row}</div>
                );
            }
        }
        if (catalog == '') {
            catalog.push(
                <div className="row no-margin-sides" key={row.length}>{row}</div>
            );
        }
        return catalog;
    }
}

export default Dashboard;
