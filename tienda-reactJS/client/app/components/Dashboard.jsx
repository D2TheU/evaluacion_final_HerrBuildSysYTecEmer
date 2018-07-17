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

    // Función para validar los campos cada vez que se detecta un input
    onAddChange(e) {
        // Obtener valor de input
        let value = e.target.value;
        // Obtener nombre de input
        let product = e.target.id.substr(6);
        // Obtener cantidad máxima del producto
        let maxValue = this.state.products[product].quantity;
        // Verificar si el valor a agregar es menos o igual a la cantidad
        if (0 < value && value <= maxValue ) {
            // Crear copia de objeto
            let products = Object.assign({}, this.state.products);
            // Actualizar valor en copia
            products[product].count = parseInt(value);
            // Asignar copia a estado de produtos
            this.setState({products});
        }
    }

    // Función para asignar el filtro mientras se teclea
    onSearchChange(e) {
        this.setState({filter: removeSpecialChr(e.target.value)});
    }

    // Función para mostrar detalle de producto
    showDetails(e) {
        var product = e.target.id.substr(8);
        this.setState({
            details: true,
            detailProduct: this.state.products[product]
        });
    }

    // Función para ocultar detalles y mostrar catálogo
    hideDetails(e) {
        var product = e.target.id.substr(8);
        this.setState({
            details: false,
            detailProduct: {}
        });
    }

    // Función para agregar a carrito
    addToCart(e) {
        // Obtener nombre de producto
        let product = e.target.id.substr(6);
        if (this.state.products[product].quantity > 0) {
            // Crear copias de objetos
            let shoppingCart = Object.assign({}, this.state.shoppingCart);
            let productObj = Object.assign({}, this.state.products[product]);
            // Agregar o actualizar producto en carrito
            if (shoppingCart[product] === undefined) {
                shoppingCart[product] = productObj;
            } else {
                shoppingCart[product].count += productObj.count;
            }
            // Asignar copia a estado de carrito
            this.setState({shoppingCart});
            // Crear copia de los productos
            let products = Object.assign({}, this.state.products);
            // Actualizar cantidad del producto agregado
            products[product].quantity = products[product].quantity - products[product].count;
            // Actualizar count del producto para modificat input
            if (products[product].quantity < products[product].count) {
                products[product].count = products[product].quantity;
            }
            // Asignar copia a estado de produtos
            this.setState({products});
        }
    }

    render() {
        let container = [];
        let topContainer = [];
        let topContainerContent = [];
        if (this.state.details) { // Validar si se mostrará vista de detalle
            // Agregar título de Detalle basado en el nombre del producto
            topContainerContent.push(
                <div className="col-md-9 title-container" key="details_title">
                    <h1>{this.state.detailProduct.name}</h1>
                </div>
            )
            // Agregar contenido de detalle
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
        } else { // Se mostrará catlalogo
            // Agregar título de Catálogo
            topContainerContent.push(
                <div className="col-md-9 title-container" key="catalog_title">
                    <h1>Catálogo de productos</h1>
                </div>
            )
            // Agregar componente de búsqueda
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
            // Agregar catálogo al contenedor
            container.push (
                    <div className="row no-margin-sides" key="catalog_container">
                        <div className="col-12 catalog-content">
                            {this.createCatalog()}
                        </div>
                    </div>
            )
        }
        // Contener el contenedor superior
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
        // Return la vista construida
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

    // Cambiar estado de mouted a true si se va montar
    componentWillMount() {
        this.state.mounted = true
    }

    // Si se montó la vista llamar a API para obtener catálogo
    componentDidMount(){
        request.get('/api/products').set({
            'API-Key': 'LndkOnelk2232nl23k',
            'Content-Type': 'application/json'
        }).end((err, res) => {
            if (err) {
                alert(err);
            } else {
                // Si no hay error obtener cuerpo de respuesta
                var products = res.body;
                // Si la vista está montada (el asignar states en vistas desmontadas marca un error/warning)
                if (this.state.mounted) {
                    // Actualizar cantidad de cada producto por si el carrito tiene ese objeto
                    for (var product in products) {
                        if (this.state.shoppingCart.hasOwnProperty(product)) {
                            products[product].quantity = products[product].quantity - this.state.shoppingCart[product].count;
                        }
                    }
                    // Asignar estado de produtos
                    this.setState({products: products});
                }
            }
        });
    }

    // Cambiar estado de mouted a false si se desmontará
    componentWillUnmount () {
        this.state.mounted = false
    }

    // Función de crear catálogo
    createCatalog() {
        // Inicializar contenedor de catálogo
        let catalog = [];
        // Inicializar el contenedor de filas del catálogo
        var row = [];
        for(var product in this.state.products) { // Ciclar por cada los productos
            // Si el filtro no está vacío y el nombre del producto no contiene el filtro, este no se mostrará y se salta
            if (this.state.filter != '' && product.indexOf(this.state.filter) == -1) {
                continue;
            }
            // Inicializar inputGroup para agregar a carrito
            var inputGroup = '';
            // Validar si hay cantidad que se pueda agregar del producto
            if (this.state.products[product].quantity > 0) {
                inputGroup = (
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <button className="btn btn-secondary" type="button" id={"count_" + removeSpecialChr(this.state.products[product].name.toLowerCase())} onClick={e => this.addToCart(e)}>Añadir</button>
                        </div>
                        <input type="number" className="form-control" id={"input_" + removeSpecialChr(this.state.products[product].name.toLowerCase())} value={this.state.products[product].count} onChange={e => this.onAddChange(e)}/>
                    </div>
                );
            }
            // Agregar la información de producto al contenedor de filas
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
                                {inputGroup}
                            </div>
                        </div>
                    </div>
                </div>
            );
            // Validar si la fila tiene un tamaño de 4
            if (row.length == 4) {
                // Agregar la fila al catálogo en su contenedor de fila
                catalog.push(
                    <div className="row no-margin-sides" key={'row_' + (catalog.length + row.length)}>{row}</div>
                );
                // Vaciar contenedor de filas para evitar duplicar productos
                row = [];
            }
        }
        // Validar si la fila tiene menos de 4 productos pero no está vacío
        if (0 < row.length && row.length < 4) {
            // Agregar la fila faltante al catálogo en su contenedor de fila
            catalog.push(
                <div className="row no-margin-sides" key={'row_' + row.length}>{row}</div>
            );
        }
        // Return contenedor de catálogo
        return catalog;
    }
}

export default Dashboard;
