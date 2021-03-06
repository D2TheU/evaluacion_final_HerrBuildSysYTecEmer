import React from 'react';
import * as request from 'superagent';

import style from "../assets/css/login.css";

class Login extends React.Component {

    constructor() {
        super()
        this.login = this.login.bind(this);
        this.state = {
            email: '',
            emailError: '',
            emailErrorMsg: 'Ingrese su correo.',
            passwordError: '',
            password: '',
            passwordErrorMsg: 'Ingrese la contraseña.'
        }
    }

    // Función para validar los campos cada vez que se detecta un input
    onChange(e) {
        var value = e.target.value.trim();
        // Validar input dependiendo del id
        this.validate(e.target.id, value);
        // Asignar estado ya sea a email o password respectivamente
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    // Función para validar correo y password, y mostrar error correspondiente
    validate(input, value) {
        switch (input) {
            case 'email':
                if (value == '' || !this.validateEmail(value)) {
                    this.setState({
                        emailError: ' is-invalid',
                        emailErrorMsg: 'Ingrese un correo válido.'
                    });
                } else {
                    this.setState({
                        emailError: '',
                    });
                }
                break;
            case 'password':
                if (value == '') {
                    this.setState({
                        passwordError: ' is-invalid',
                        passwordErrorMsg: 'Ingrese la contraseña.'
                    });
                } else {
                    this.setState({
                        passwordError: '',
                    });
                }
                break;
            default:

        }
    }

    // Función regex para validar correo
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Función para detectar Enter cuanto se está en un input
    // (1) user/email cambia el focus a password (2) password llama función login
    loginKeyPress(e) {
        if (e.key == 'Enter') {
            if (e.target.id == 'password') {
                this.login();
            } else {
                document.getElementById('password').focus();
            }
        }
    }

    render() {
        return (
            <div className="container-fluid login-container">
                <div className="row vertical-center">
                    <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        <h1>Inicia Sesión</h1>
                        <form id="login-form">
                            <div className="form-group">
                                <label htmlFor="email">Correo electrónico</label>
                                <input type="email" className={'form-control' + this.state.emailError} id="email" value={this.state.email} onChange={e => this.onChange(e)} onKeyPress={e => this.loginKeyPress(e)} required/>
                                <div className="invalid-feedback">{this.state.emailErrorMsg}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input type="password" className={'form-control' + this.state.passwordError} id="password" value={this.state.password} onChange={e => this.onChange(e)} onKeyPress={e => this.loginKeyPress(e)} required/>
                                <div className="invalid-feedback">{this.state.passwordErrorMsg}</div>
                            </div>
                            <button type="button" onClick={this.login} className="btn btn-success">Ingresar</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    // Función de login
    login() {
        var email = document.getElementById('email').value.trim();
        var password = document.getElementById('password').value;
        // Validar que los inputs tienen información
        if (email != '' && password != '') {
            // Mandar post a Api de Login
            request.post('/api/login').set({
                'API-Key': 'LndkOnelk2232nl23k',
                'Content-Type': 'application/json'
            }).send({
                email: email,
                password: password
            }).end((err, res) => {
                if (err) {
                    alert(err);
                } else {
                    // Si la respuesta es login se redirige al tablero
                    if (res.body.result == 'login') {
                        this.props.history.push('/dashboard');
                    } else {
                        // Si no es login se muestra mensaje de contraseña incorrecta.
                        this.setState({
                            password: '',
                            passwordError: ' is-invalid',
                            passwordErrorMsg: 'Contraseña incorrecta.'
                        });
                    }
                }
            });
        } else {
            // Algun campo está vacio, identificar cual, validarlo y mostrar etiquetas de error.
            if (email == '') {
                this.setState({
                    email: '',
                    emailError: ' is-invalid',
                    emailErrorMsg: 'Ingrese su correo.'
                });
                if (password == '') {
                    this.setState({
                        password: '',
                        passwordError: ' is-invalid',
                        passwordErrorMsg: 'Ingrese la contraseña.'
                    });
                }
            } else {
                this.validate('email', email);
                if (this.validateEmail(email)) {
                    this.validate('password', password);
                }
            }
        }

    }
}

export default Login;
