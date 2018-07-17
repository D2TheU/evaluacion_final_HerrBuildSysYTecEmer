import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { CartService } from '../services/cart.service';
import { HttpService } from '../services/http.service';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['../dashboard/dashboard.component.css', './cart.component.css']
})
export class CartComponent implements OnInit {

  shoppingCart = {};

  constructor(private cartService: CartService, private httpService: HttpService, private helperService: HelperService) {
    this.shoppingCart = cartService.getCart();
  }

  ngOnInit() {
  }

  getTotal() {
    let total = 0;
    for (let item in this.shoppingCart) {
      total += this.shoppingCart[item].quantity * this.shoppingCart[item].price;
    }
    return total;
  }

  cancel() {
    this.shoppingCart = {};
    this.cartService.setCart({});
  }

  pay() {
    this.httpService.getProducts()
      .subscribe(
        (data: Response) => {
          for (let id in data) {
            let name = this.helperService.removeSpecialChr(data[id].name.toLowerCase());
            for (let item in this.shoppingCart) {
              if (name == item) {
                data[id] = {
                  file: this.shoppingCart[item].file,
                  name: this.shoppingCart[item].name,
                  price: this.shoppingCart[item].price,
                  quantity: data[id].quantity - this.shoppingCart[item].quantity
                }
              }
            }
          }
          this.httpService.updateProducts(data)
            .subscribe(
              (data: Response) => {
                if (data.status == 200) {
                  this.shoppingCart = {};
                  this.cartService.setCart({});
                  alert('¡Gracias por comprar con nosotros!');
                } else {
                  alert('¡Error! Favor de intentar más tarde.');
                }
              }
            );
        }
      )
  }

}
