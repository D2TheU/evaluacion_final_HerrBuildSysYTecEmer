import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // Propiedades para Componente de Login
  emailValue = '';
  emailError = '';
  emailErrorMsg = 'Ingrese su correo.';
  passwordValue = '';
  passwordError = '';
  passwordErrorMsg = 'Ingrese la contraseña.';

  constructor(private httpService: HttpService, private router: Router) { }

  // Función para validar los campos cada vez que se detecta un input
  onChange(target) {
    // Validar input dependiendo del id
    this.validate(target.id, target.value);
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

  // Función de login
  login() {
    // Validar que los inputs tienen información
    if (this.emailValue != '' && this.passwordValue != '') {
      // Obtener los usuarios de base de datos
      this.httpService.getUsers()
        .subscribe(
          (data: Response) => {
            let aux: any[] = [];
            let logged = false;
            // Ciclar por todos los usuarios
            for (let key in data) {
              // Si un usuario tiene el mismo correo y contraseña, se asigna true a logged y se redirige al tablero
              if (data[key]['chrEmail'] == this.emailValue && data[key]['chrPassword'] == this.passwordValue) {
                logged = true;
                this.router.navigateByUrl('/dashboard');
              }
            }
            // Si logged es falso se muestra mensaje de contraseña incorrecta.
            if (!logged) {
              this.passwordValue = '';
              this.passwordError = 'is-invalid';
              this.passwordErrorMsg = 'Contraseña incorrecta.';
            }
          }
        )
    } else {
      // Algun campo está vacio, identificar cual, validarlo y mostrar etiquetas de error.
      if (this.emailValue == '') {
        this.emailError = 'is-invalid';
        this.emailErrorMsg = 'Ingrese su correo.';
        if (this.passwordValue == '') {
          this.passwordError = 'is-invalid';
          this.passwordErrorMsg = 'Ingrese la contraseña.';
        }
      } else {
        this.validate('email', this.emailValue);
        if (this.validateEmail(this.emailValue)) {
          this.validate('password', this.passwordValue);
        }
      }
    }
  }

  // Función para validar correo y password, y mostrar error correspondiente
  private validate(input, value) {
    switch (input) {
      case 'email':
        value = value.trim();
        this.emailValue = value;
        if (value == '' || !this.validateEmail(value)) {
          this.emailError = 'is-invalid';
          this.emailErrorMsg = 'Ingrese un correo válido.';
        } else {
          this.emailError = '';
        }
        break;
      case 'password':
        this.passwordValue = value;
        if (value == '') {
          this.passwordError = 'is-invalid';
          this.passwordErrorMsg = 'Ingrese la contraseña.';
        } else {
          this.passwordError = '';
        }
        break;
      default:

    }
  }

  // Función regex para validar correo
  private validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // // Función de desarrollo para agregar usuario
  // addUser() {
  //   this.httpService.sendUser({ chrFullName: 'Brandon Shneider', chrEmail: 'brandon@mail.com', chrPassword: 'password' })
  //     .subscribe(
  //       (data: Response) => {
  //         console.log(data);
  //       }
  //     );
  // }
}
