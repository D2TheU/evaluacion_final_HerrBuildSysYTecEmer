import React from 'react';
import { Link } from 'react-router-dom';
import * as request from 'superagent';

import style from '../assets/css/dashboard.css';

import Navbar from './Navbar.jsx';

import { removeSpecialChr, orderObject } from './helpers/helpers.jsx'

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.createCatalog = this.createCatalog.bind(this);
        this.state = {
            mounted: false,
            filter: '',
            products: {},
            details: false,
            detailProduct: {},
            shoppingCart: this.props.location.state !== undefined ? orderObject(this.props.location.state.shoppingCart) : {}
        }
    }

    onAddChange(e) {
        let value = e.target.value;
        if (value > 0) {
            // Get product name
            let product = e.target.id.substr(6);
            // Creating copy of object
            let products = Object.assign({}, this.state.products);
            // Updating value
            products[product].count = parseInt(value);
            // setState of all products
            this.setState({products});
        }
    }

    onSearchChange(e) {
        this.setState({filter: removeSpecialChr(e.target.value)});
    }

    showDetails(e) {
        var product = e.target.id.substr(8);
        this.setState({
            details: true,
            detailProduct: this.state.products[product]
        });
    }

    hideDetails(e) {
        var product = e.target.id.substr(8);
        this.setState({
            details: false,
            detailProduct: {}
        });
    }

    addToCart(e) {
        // Get product name
        let product = e.target.id.substr(6);
        // Creating copy of object
        let shoppingCart = Object.assign({}, this.state.shoppingCart);
        let productObj = Object.assign({}, this.state.products[product]);
        // Updating value
        if (shoppingCart[product] === undefined) {
            shoppingCart[product] = productObj;
        } else {
            shoppingCart[product].count += productObj.count;
        }
        // setState of all shoppingCart
        this.setState({shoppingCart});
    }

    render() {
        let container = [];
        let topContainer = [];
        let topContainerContent = [];
        if (this.state.details) { // Will show details view
            // Add details title to topContainerContent
            topContainerContent.push(
                <div className="col-md-9 title-container" key="details_title">
                    <h1>{this.state.detailProduct.name}</h1>
                </div>
            )
            // Add details body to container
            container.push (
                    <div className="row no-margin-sides" key="details_container">
                        <div className="col-12 details-content">
                            <div className="row no-margin-sides">
                                <div className="card col-md-5" id="card-details">
                                    <img className="card-img-detail" src={'/assets/img/' + this.state.detailProduct.file} alt="Card image cap"/>
                                </div>
                                <div className="col-md-5" id="info-details">
                                    <p className="card-text"><strong>Precio: </strong>${this.state.detailProduct.price}</p>
                                    <p className="card-text"><strong>Unidades disponibles: </strong>{this.state.detailProduct.quantity}</p>
                                </div>
                            </div>
                            <button className="btn btn-outline-secondary" id="showCatalog" onClick={e => this.hideDetails(e)}>Atrás</button>
                        </div>
                    </div>
            )
        } else { // Will show catalog view
            // Add catalog title to topContainerContent
            topContainerContent.push(
                <div className="col-md-9 title-container" key="catalog_title">
                    <h1>Catálogo de productos</h1>
                </div>
            )
            // Add catalog search view to topContainerContent
            topContainerContent.push(
                <div className="col-md-3 search-container" key="catalog_search">
                    <p>¿Qué estás buscando?</p>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="search_addon"><img src="/assets/img/ic_search.svg"/></span>
                        </div>
                        <input type="text" className="form-control" id="search" value={this.state.filter} onChange={e => this.onSearchChange(e)}/>
                    </div>
                </div>
            )
            // Add catalog body to container
            container.push (
                    <div className="row no-margin-sides" key="catalog_container">
                        <div className="col-12 catalog-content">
                            {this.createCatalog()}
                        </div>
                    </div>
            )
        }
        // Wrap topContainerContent and add to topContainer
        topContainer.push(
            <div className="row no-margin-sides" key="top_container">
                <div className="col-12 top-content">
                    <div className="row">
                        {topContainerContent}
                    </div>
                    <hr/>
                </div>
            </div>
        );
        // Return assembled view in containerFluid and container, add Navbar, topContainer and container
        return (
            <div className="container-fluid fill-height dashboard-container">
                <div className="container no-padding-sides">
                    <Navbar shoppingCart={this.state.shoppingCart}/>
                    {topContainer}
                    {container}
                </div>
            </div>
        )
    }

    componentWillMount() {
        this.state.mounted = true
    }

    componentDidMount(){
        request.get('/api/products').set({
            'API-Key': 'LndkOnelk2232nl23k',
            'Content-Type': 'application/json'
        }).end((err, res) => {
            if (err) {
                alert(err);
            } else {
                var products = res.body;
                if (this.state.mounted) {
                    if (this.state.products != products) {
                        this.setState({products: products});
                    }
                }
            }
        });
    }

    componentWillUnmount () {
        this.state.mounted = false
    }

    createCatalog() {
        // Initialize catalog container
        let catalog = [];
        // Initialize product row container
        var row = [];
        for(var product in this.state.products) { // Cycle through all products
            // If filter is not empty and product name doesn't contain filter skip product.
            if (this.state.filter != '' && product.indexOf(this.state.filter) == -1) {
                continue;
            }
            // Push product view to row with current product's information
            row.push(
                <div className="card col-md-3" key={'card-' + removeSpecialChr(product)}>
                    <img className="card-img-top" src={'/assets/img/' + this.state.products[product].file} alt="Card image cap"/>
                    <div className="card-body no-padding-sides">
                        <h5 className="card-title">{this.state.products[product].name}</h5>
                        <p className="card-text"><strong>Precio: </strong>${this.state.products[product].price}</p>
                        <p className="card-text"><strong>Unidades disponibles: </strong>{this.state.products[product].quantity}</p>
                        <div className="row no-margin-sides card-bottom">
                            <div className="col-5 col-md-12 col-lg-5 no-padding-sides">
                                <button className="btn btn-primary" id={"details_" + removeSpecialChr(this.state.products[product].name.toLowerCase())} onClick={e => this.showDetails(e)}>Ver más</button>
                            </div>
                            <div className="col-7 col-md-12 col-lg-7 no-padding-sides">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <button className="btn btn-secondary" type="button" id={"count_" + removeSpecialChr(this.state.products[product].name.toLowerCase())} onClick={e => this.addToCart(e)}>Añadir</button>
                                    </div>
                                    <input type="number" className="form-control" id={"input_" + removeSpecialChr(this.state.products[product].name.toLowerCase())} value={this.state.products[product].count} onChange={e => this.onAddChange(e)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
            // If row has reach its maximum of 4
            if (row.length == 4) {
                // Add row to catalog container with its row wrapper
                catalog.push(
                    <div className="row no-margin-sides" key={'row_' + (catalog.length + row.length)}>{row}</div>
                );
                // Empty row to avoid duplicates
                row = [];
            }
        }
        // Products' for has finished but row wasn't added to catalog
        if (row.length < 4) {
            // Add row to catalog container with its row wrapper
            catalog.push(
                <div className="row no-margin-sides" key={'row_' + row.length}>{row}</div>
            );
        }
        // Return catalog container
        return catalog;
    }
}

export default Dashboard;
