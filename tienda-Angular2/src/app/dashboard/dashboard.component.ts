import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { CartService } from '../services/cart.service';
import { HttpService } from '../services/http.service';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Propiedades para Componente de Tablero
  filter = '';
  products = {};
  details = false;
  detailProduct = {};
  shoppingCart = {};

  constructor(private cartService: CartService, private httpService: HttpService, private helperService: HelperService) {
    // Obtener carrito de Local Storage.
    this.shoppingCart = cartService.getCart();
    // // Código de desarrollo para agregar productos
    // this.addProduct("Aguacate", "aguacate.jpg", 1);
    // this.addProduct("Ajo", "ajo.jpg", 2);
    // this.addProduct("Almendras", "almendras.jpg", 3);
    // this.addProduct("Arándanos", "arandanos.jpg", 4);
    // this.addProduct("Brócoli", "brocoli.png", 5);
    // this.addProduct("Calabaza", "calabaza.jpg", 6);
    // this.addProduct("Canela", "canela.jpg", 7);
    // this.addProduct("Cebolla", "cebolla.jpg", 8);
    // this.addProduct("Fresa", "fresa.jpg", 9);
    // this.addProduct("Kiwi", "kiwi.jpg", 10);
    // this.addProduct("Limón", "limon.jpg", 11);
    // this.addProduct("Lychee", "lychee.jpg", 12);
    // this.addProduct("Maíz", "maiz.jpg", 13);
    // this.addProduct("Manzana", "manzana.jpg", 14);
    // this.addProduct("Naranja", "naranja.jpg", 15);
    // this.addProduct("Papa", "papa.jpg", 16);
    // this.addProduct("Pasta", "pasta.jpg", 17);
    // this.addProduct("Pimienta", "pimienta.jpg", 18);
    // this.addProduct("Repollo", "repollo.jpg", 19);
    // this.addProduct("Tomate", "tomate.jpg", 20);
    // this.addProduct("Zanahoria",  "zanahoria.jpg", 21);
  }

  ngOnInit() {
    // Obtener productos al Iniciar
    this.httpService.getProducts()
      .subscribe(
        (data: Response) => {
          // Crear objeto de productos vacío
          let tempProducts = {};
          for (let id in data) {
            // Obtener nombre para llave de lista de productos, en minúsculas y sin caracteres especiales
            let name = this.helperService.removeSpecialChr(data[id].name.toLowerCase());
            // Agregar JSON de producto a nuevo objeto con el nombre como llave.
            tempProducts[name] = data[id];
            // Validar si el objeto existe en el carrito
            if (this.shoppingCart.hasOwnProperty(name)) {
              // Actualizar la cantidad de producto basado en el carrito
              if (tempProducts[name].quantity - this.shoppingCart[name].quantity < 0) {
                // Si el carrito tiene más cantidad que el catálogo, asignar la cantidad máxima al carrito y dejar en cero el producto en catálogo
                this.shoppingCart[name].quantity = tempProducts[name].quantity;
                tempProducts[name].quantity = 0;
              } else {
                // Actualizar cantidad de catálogo menos la cantiad de carrito
                tempProducts[name].quantity = tempProducts[name].quantity - this.shoppingCart[name].quantity;
              }
            }
          }
          this.products = this.helperService.orderObject(tempProducts);
        }
      )
  }

  // Función para quitar espacios a inicio y final de filtro mientras se escribe
  onFilter(value) {
    this.filter = value.trim();
  }

  // Función para mostrar detalle de producto
  showDetails(target) {
    var product = target.id.substring(8);
    this.details = true;
    this.detailProduct = this.products[product];
  }

  // Función para ocultar detalles y mostrar catálogo
  hideDetails() {
    this.details = false;
    this.detailProduct = {};
  }

  // Función para agregar a carrito
  addToCart(target) {
    // Obtener nombre de producto
    let product = target.id.substr(6);
    if (this.products[product].quantity > 0) {
      // Crear copias de objetos
      let shoppingCart = Object.assign({}, this.shoppingCart);
      let productObj = Object.assign({}, this.products[product]);
      // Obtener valor de inputs para agregar a carrito
      let productQuantity = parseInt((<HTMLInputElement>document.getElementById('input_' + product)).value);
      // Asignar cantidad del objeto a agregar, si la cantidad a agregar es mayor que la del catálogo, se asigna la del catálogo.
      productObj.quantity = productQuantity < this.products[product].quantity ? productQuantity : this.products[product].quantity;
      // Agregar o actualizar producto en carrito
      if (shoppingCart[product] === undefined) {
        shoppingCart[product] = productObj;
      } else {
        shoppingCart[product].quantity += productObj.quantity;
      }
      // Guardar carrito en Local Storage
      this.cartService.setCart(shoppingCart);
      // Obtener carrito ordenado de Local Storage y guardar en propiedad de carrito del componente
      this.shoppingCart = this.cartService.getCart();
      // Crear copia de los productos
      let products = Object.assign({}, this.products);
      // Actualizar cantidad del producto agregado
      products[product].quantity = products[product].quantity - productObj.quantity;
      // Guardar lista actualizada de productos.
      this.products = products;
    }
  }

  // // Función de desarrollo para agregar un producto a base de datos
  // addProduct(name, file, price) {
  //   this.httpService.sendProduct({ name: name, file: file, price: price, quantity: 100 })
  //     .subscribe(
  //       (data: Response) => {
  //         console.log(data);
  //       }
  //     );
  // }

}
