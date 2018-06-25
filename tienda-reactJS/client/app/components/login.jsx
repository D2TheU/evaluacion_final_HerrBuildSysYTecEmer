import React from 'react';
import * as request from 'superagent';

import style from "../assets/css/login.css";

class Login extends React.Component {

    constructor() {
        super()
        this.state = {
            emailValue: '',
            emailError: '',
            emailErrorMsg: 'Ingrese correo.',
            passwordValue: '',
            passwordError: '',
            passwordErrorMsg: 'Ingrese contraseña.'
        }
    }
    componentWillMount(){

    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row vertical-center">
                    <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4 login-container">
                        <h1>Inicia Sesión</h1>
                        <form>
                            <div className="form-group">
                                <label htmlFor="email">Correo electrónico</label>
                                <input type="email" className={'form-control' + this.state.emailError} id="email" value={this.state.emailValue} onChange={evt => this.updateEmailValue(evt)} required/>
                                <div className="invalid-feedback">{this.state.emailErrorMsg}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input type="password" className={'form-control' + this.state.passwordError} id="password" value={this.state.passwordValue} onChange={evt => this.updatePasswordValue(evt)} required/>
                                <div className="invalid-feedback">{this.state.passwordErrorMsg}</div>
                            </div>
                            <button type="button" onClick={this.login} className="btn btn-success">Ingresar</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    updateEmailValue(evt) {
        var value = evt.target.value.trim();
        if (value == '') {
            this.setState({
                emailError: ' is-invalid',
                emailErrorMsg: 'Ingrese correo.'
            });
        } else {
            this.setState({
                emailError: '',
            });
        }
        this.setState({
            emailValue: evt.target.value
        });
    }
    updatePasswordValue(evt) {
        var value = evt.target.value.trim();
        if (value == '') {
            this.setState({
                passwordError: ' is-invalid',
                passwordErrorMsg: 'Ingrese correo.'
            });
        } else {
            this.setState({
                passwordError: '',
            });
        }
        this.setState({
            passwordValue: evt.target.value
        });
    }
    login() {
        console.log('Hello');
        // request.get('/api/users')
        //     .set({
        //         'API-Key': 'LndkOnelk2232nl23k',
        //         'Content-Type': 'application/json'
        //     })
        //     .end((err, res) => {
        //         console.log(res);
        //     });
    }
}

export default Login;
