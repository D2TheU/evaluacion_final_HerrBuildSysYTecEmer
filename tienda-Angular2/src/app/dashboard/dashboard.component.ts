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

  filter = '';
  products = {};
  details = false;
  detailProduct = {};
  shoppingCart = {};

  constructor(private cartService: CartService, private httpService: HttpService, private helperService: HelperService) {
    this.shoppingCart = cartService.getCart();

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
    this.httpService.getProducts()
      .subscribe(
        (data: Response) => {
          let tempProducts = {};
          for (let id in data) {
            let name = this.helperService.removeSpecialChr(data[id].name.toLowerCase());
            tempProducts[name] = data[id];
            if (this.shoppingCart.hasOwnProperty(name)) {
              if (tempProducts[name].quantity - this.shoppingCart[name].quantity < 0) {
                this.shoppingCart[name].quantity = tempProducts[name].quantity;
                tempProducts[name].quantity = 0;
              } else {
                tempProducts[name].quantity = tempProducts[name].quantity - this.shoppingCart[name].quantity;
              }
            }
          }
          let orderedProducts = {};
          Object.keys(tempProducts).sort().forEach(function(key) {
            orderedProducts[key] = tempProducts[key];
          });
          this.products = orderedProducts;
        }
      )
  }

  onFilter(value) {
    this.filter = value.trim();
  }

  showDetails(target) {
    var product = target.id.substring(8);
    this.details = true;
    this.detailProduct = this.products[product];
  }

  hideDetails() {
    this.details = false;
    this.detailProduct = {};
  }

  addToCart(target) {
    // Get product name
    let product = target.id.substr(6);
    if (this.products[product].quantity > 0) {
      // Creating copy of object
      let shoppingCart = Object.assign({}, this.shoppingCart);
      let productObj = Object.assign({}, this.products[product]);
      // Get input value to add
      let productQuantity = parseInt((<HTMLInputElement>document.getElementById('input_' + product)).value);
      // Set value to object, if added quantity is higher than product quantity add product quantity.
      productObj.quantity = productQuantity < this.products[product].quantity ? productQuantity : this.products[product].quantity;
      // Updating value
      if (shoppingCart[product] === undefined) {
        shoppingCart[product] = productObj;
      } else {
        shoppingCart[product].quantity += productObj.quantity;
      }
      this.cartService.setCart(shoppingCart);
      // Copy shopping cart to property
      this.shoppingCart = this.cartService.getCart();
      // Creating copy of object
      let products = Object.assign({}, this.products);
      // Updating value
      products[product].quantity = products[product].quantity - productObj.quantity;
      // setState of all products
      this.products = products;
    }
  }

  // addProduct(name, file, price) {
  //   this.httpService.sendProduct({ name: name, file: file, price: price, quantity: 100 })
  //     .subscribe(
  //       (data: Response) => {
  //         console.log(data);
  //       }
  //     );
  // }

}
