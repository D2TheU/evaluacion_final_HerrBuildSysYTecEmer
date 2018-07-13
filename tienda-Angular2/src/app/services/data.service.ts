import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { Response } from '@angular/http';

@Injectable()
export class DataService {

  constructor(private httpService: HttpService, private router: Router) { }

  login(email: string, password: string, passwordInput: any, passwordErrorInput: any) {
    this.httpService.getUsers()
      .subscribe(
        (data: Response) => {
          let aux: any[] = [];
          let logged = false;
          for (let key in data) {
            if (data[key]['chrEmail'] == email && data[key]['chrPassword'] == password) {
              logged = true;
              this.router.navigateByUrl('/dashboard');
            }
          }
          if (!logged) {
            passwordInput.classList.add('is-invalid');
            console.log(this)
            passwordErrorInput.value = "nop";
          }
        }
      )
  }

  // newUser(fullname: string, email: string, password: string) {
  //   this.httpService.sendUser({ chrFullName: fullname, chrEmail: email, chrPassword: password })
  //     .subscribe(
  //       (data: Response) => {
  //         console.log(data);
  //       }
  //     )
  //   return this.usuarios;
  // }
}
