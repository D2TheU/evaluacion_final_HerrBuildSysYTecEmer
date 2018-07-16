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
              if (tempProducts[name].quantity - this.shoppingCart[name].count < 0) {
                this.shoppingCart[name].count = tempProducts[name].quantity;
                tempProducts[name].quantity = 0;
              } else {
                tempProducts[name].quantity = tempProducts[name].quantity - this.shoppingCart[name].count;
              }
            }
          }
          this.products = tempProducts;
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
      let productCount = parseInt((<HTMLInputElement>document.getElementById('input_' + product)).value);
      // Set value to object, if count is higher that quantity add quantity.
      productObj.count = productCount < this.products[product].quantity ? productCount : this.products[product].quantity;
      // Updating value
      if (shoppingCart[product] === undefined) {
        shoppingCart[product] = productObj;
      } else {
        shoppingCart[product].count += productObj.count;
      }
      // Copy shopping cart to property
      this.shoppingCart = shoppingCart;
      // Creating copy of object
      let products = Object.assign({}, this.products);
      // Updating value
      products[product].quantity = products[product].quantity - productObj.count;
      // setState of all products
      this.products = products;
      this.cartService.setCart(this.shoppingCart);
    }
  }

  // addProduct(name, file, price) {
  //   this.httpService.sendProduct({ name: name, file: file, price: price, quantity: 100, count: 1 })
  //     .subscribe(
  //       (data: Response) => {
  //         console.log(data);
  //       }
  //     );
  // }

}
