import { Injectable } from '@angular/core';

@Injectable()
export class CartService {

    private CART_KEY = 'cart';

  constructor() { }

  setCart(newCart) {
    localStorage.setItem(this.CART_KEY, JSON.stringify(newCart));
  }

  getCart() {
    if (localStorage.getItem(this.CART_KEY) === null) {
      localStorage.setItem(this.CART_KEY, JSON.stringify({}));
    }
    return JSON.parse(localStorage.getItem(this.CART_KEY));
  }
}
