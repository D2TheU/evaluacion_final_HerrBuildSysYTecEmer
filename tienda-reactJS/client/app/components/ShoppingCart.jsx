import React from 'react';
import { Link } from 'react-router-dom';
import * as request from 'superagent';

import style from '../assets/css/cart.css';

import Navbar from './Navbar.jsx';

import { orderObject, isObjectEmpty } from './helpers/helpers.jsx'

class ShoppingCart extends React.Component {

    constructor(props) {
        super(props)
        this.createShoppingCart = this.createShoppingCart.bind(this);
        this.pay = this.pay.bind(this);
        this.cancel = this.cancel.bind(this);
        this.state = {
            shoppingCart: this.props.location.state !== undefined ? orderObject(this.props.location.state.shoppingCart) : {}
        }
    }

    render() {
        let topContainer = [];
        let topContainerContent = [];
        topContainerContent.push(
            <div className="col-md-9 title-container" key="details_title">
                <h1>Carrito de compras</h1>
            </div>
        )
        // Add details body to container

        // Wrap topContainerContent and add to topContainer, create shoppingCart and wrap it as well.
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
                    {this.createShoppingCart()}
                </div>
            </div>
        )
    }

    pay() {
        let checkoutProducts = [];
        for (var item in this.state.shoppingCart) {
            checkoutProducts.push({
                'name': this.state.shoppingCart[item].name,
                'quantity': this.state.shoppingCart[item].count
            })
        }
        request.post('/api/products/checkout').set({
            'API-Key': 'LndkOnelk2232nl23k',
            'Content-Type': 'application/json'
        }).send({
            products: checkoutProducts
        }).end((err, res) => {
            if (err) {
                alert(err);
            } else {
                if (res.body.result == 'ok') {
                    this.setState({
                        shoppingCart: {}
                    });
                    alert('¡Gracias por comprar con nosotros!');
                } else if (res.body.result == 'empty') {
                    alert('El carrito está vacío.');
                } else {
                    alert('¡Error! Favor de intentar más tarde');
                }
            }
        });
    }

    cancel() {
        this.setState({
            shoppingCart: {}
        });
    }

    createShoppingCart() {
        // Initialize catalog container
        let shoppingCart = [];
        // Initialize product row container
        var cartItem = [];
        var total = 0;
        for (var item in this.state.shoppingCart) {
            cartItem.push (
                <div className="card shopping-card" id={'item-' + item} key={'item-' + item}>
                    <div className="row no-margin-sides">
                        <div className="col-md-4">
                            <img className="item-img-detail" src={'/assets/img/' + this.state.shoppingCart[item].file} alt="Card image cap"/>
                        </div>
                        <div className="col-md-8">
                            <h5 className="card-title">{this.state.shoppingCart[item].name}</h5>
                            <p className="card-text"><strong>Unidades: </strong>{this.state.shoppingCart[item].count}</p>
                            <p className="card-text"><strong>Subtotal: </strong>${this.state.shoppingCart[item].count*this.state.shoppingCart[item].price}</p>
                        </div>
                    </div>
                </div>
            )
            total += this.state.shoppingCart[item].count*this.state.shoppingCart[item].price;
        }
        var checkoutGroup = '';
        if (!isObjectEmpty(this.state.shoppingCart)) {
            checkoutGroup = (
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button className="btn btn-outline-secondary" id="showCatalog" onClick={this.cancel}>Cancelar</button>
                    <button className="btn btn-outline-secondary" id="showCatalog" onClick={this.pay}>Pagar</button>
                </div>
            );
        }
        shoppingCart.push (
                <div className="row no-margin-sides" key="cart_container">
                    <div className="col-12 cart-content">
                        <div className="row no-margin-sides">
                            <div className="col-md-6" id="all-items">
                                {cartItem}
                            </div>
                            <div className="col-md-6 order-first order-md-last" id="info-details">
                                <h3>Total: {total}</h3>
                                {checkoutGroup}
                            </div>
                        </div>
                    </div>
                </div>
        )
        // Return catalog container
        return shoppingCart;
    }
}

export default ShoppingCart;
