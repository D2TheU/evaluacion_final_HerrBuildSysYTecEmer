import { Injectable } from '@angular/core';

@Injectable()
export class CartService {

  private CART_KEY = 'cart';

  constructor() { }

  setCart(newCart) {
    let orderedCart = {};
    Object.keys(newCart).sort().forEach(function(key) {
      orderedCart[key] = newCart[key];
    });
    localStorage.setItem(this.CART_KEY, JSON.stringify(orderedCart));
  }

  getCart() {
    if (localStorage.getItem(this.CART_KEY) === null) {
      localStorage.setItem(this.CART_KEY, JSON.stringify({}));
    }
    let localCart = JSON.parse(localStorage.getItem(this.CART_KEY));
    let orderedCart = {};
    Object.keys(localCart).sort().forEach(function(key) {
      orderedCart[key] = localCart[key];
    });
    return orderedCart;
  }
}
