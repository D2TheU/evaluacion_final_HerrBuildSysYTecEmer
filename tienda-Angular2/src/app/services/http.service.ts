import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class HttpService {

  constructor(private http: Http) { }

  // Función para obtener todos los usuarios
  getUsers() {
    return this.http.get('https://tienda-nextu.firebaseio.com/usuarios/.json')
      .map((response: Response) => response.json());
  }

  // Función para obtener todos los productos
  getProducts() {
    return this.http.get('https://tienda-nextu.firebaseio.com/productos/.json')
      .map((response: Response) => response.json());
  }

  // Función para actualizar la lista de productos
  updateProducts(products: any) {
    const productData = JSON.stringify(products);
    return this.http.put('https://tienda-nextu.firebaseio.com/productos/.json', productData);
  }

  // // Función de desarrollo para agregar un usuario
  // sendUser(user: any) {
  //   const userData = JSON.stringify(user);
  //   return this.http.post('https://tienda-nextu.firebaseio.com/usuarios/.json', userData)
  //     .map((response: Response) => response.json());
  // }

  // // Función de desarrollo para agregar un producto
  // sendProduct(product: any) {
  //   const userData = JSON.stringify(product);
  //   return this.http.post('https://tienda-nextu.firebaseio.com/productos/.json', userData)
  //     .map((response: Response) => response.json());
  // }
}
