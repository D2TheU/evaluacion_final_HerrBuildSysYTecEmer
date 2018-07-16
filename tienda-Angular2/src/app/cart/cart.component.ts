import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['../dashboard/dashboard.component.css','./cart.component.css']
})
export class CartComponent implements OnInit {

  shoppingCart = {};

  constructor(private cartService: CartService) {
      this.shoppingCart = cartService.getCart();
  }

  ngOnInit() {
  }

  getTotal(){
      let total = 0;
      for (let item in this.shoppingCart){
          total += this.shoppingCart[item].count*this.shoppingCart[item].price;
      }
      return total;
  }

  cancel() {
      this.shoppingCart = {};
      this.cartService.setCart({});
  }

}
