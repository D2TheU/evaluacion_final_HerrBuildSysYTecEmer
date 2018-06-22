import React from 'react';
import style from "../css/login.css";
import * as request from 'superagent';

class Login extends React.Component {

    constructor() {
        super()
    }
    componentWillMount(){

    }
    render() {
        return (
            <div className="row vertical-center">
                <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4 login-container">
                    <h1>Inicia Sesión</h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Correo electrónico</label>
                            <input type="email" className="form-control" id="email" required/>
                            <div className="invalid-feedback">Ingrese correo.</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" className="form-control" id="password" required/>
                            <div className="invalid-feedback">Ingrese contraseña.</div>
                        </div>
                        <button type="button" onClick={this.login} className="btn btn-success">Ingresar</button>
                    </form>
                </div>
            </div>
        )
    }
    componentDidMount() {

    }
    login() {
        request.get('../backend/backend.php')
            .set({
                'API-Key': 'LndkOnelk2232nl23k',
                'Content-Type': 'application/json'
            })
            .end((err, res) => {
                console.log(res);
            });
    }
}

export default Login;
