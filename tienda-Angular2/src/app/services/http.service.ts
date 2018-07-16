import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class HttpService {

  constructor(private http: Http) { }

  getUsers() {
    return this.http.get('https://tienda-nextu.firebaseio.com/usuarios/.json')
      .map((response: Response) => response.json());
  }

  getProducts() {
    return this.http.get('https://tienda-nextu.firebaseio.com/productos/.json')
      .map((response: Response) => response.json());
  }

  // sendUser(user: any) {
  //   const userData = JSON.stringify(user);
  //   return this.http.post('https://tienda-nextu.firebaseio.com/usuarios/.json', userData)
  //     .map((response: Response) => response.json());
  // }

  // sendProduct(product: any) {
  //   const userData = JSON.stringify(product);
  //   return this.http.post('https://tienda-nextu.firebaseio.com/productos/.json', userData)
  //     .map((response: Response) => response.json());
  // }
}
