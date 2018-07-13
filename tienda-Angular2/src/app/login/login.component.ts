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
  emailValue = '';
  emailError = '';
  emailErrorMsg = 'Ingrese su correo.';
  passwordValue = '';
  passwordError = '';
  passwordErrorMsg = 'Ingrese la contraseña.';

  constructor(private httpService: HttpService, private router: Router) { }

  onChange(target) {
    this.validate(target.id, target.value);
  }

  loginKeyPress(e) {
    if (e.key == 'Enter') {
      if (e.target.id == 'password') {
        this.login();
      } else {
        document.getElementById('password').focus();
      }
    }
  }

  login() {
    if (this.emailValue != '' && this.passwordValue != '') {
      this.httpService.getUsers()
        .subscribe(
          (data: Response) => {
            let aux: any[] = [];
            let logged = false;
            for (let key in data) {
              if (data[key]['chrEmail'] == this.emailValue && data[key]['chrPassword'] == this.passwordValue) {
                logged = true;
                this.router.navigateByUrl('/dashboard');
              }
            }
            if (!logged) {
              this.passwordValue = '';
              this.passwordError = 'is-invalid';
              this.passwordErrorMsg = 'Contraseña incorrecta.';
            }
          }
        )
    } else {
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

  private validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // addUser() {
  //   this.httpService.sendUser({ chrFullName: 'Brandon Shneider', chrEmail: 'brandon@mail.com', chrPassword: 'password' })
  //     .subscribe(
  //       (data: Response) => {
  //         console.log(data);
  //       }
  //     );
  // }
}
