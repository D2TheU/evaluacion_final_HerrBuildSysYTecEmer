import { Injectable } from '@angular/core';
import { HelperService } from '../services/helper.service';


@Injectable()
export class CartService {

  private CART_KEY = 'cart';

  constructor(private helperService: HelperService) { }

  // Guardar carrito a Local Storage ordenado
  setCart(newCart) {
    localStorage.setItem(this.CART_KEY, JSON.stringify(this.helperService.orderObject(newCart)));
  }

  // Guardar carrito vacío a Local Storage ordenado
  emptyCart() {
    localStorage.setItem(this.CART_KEY, JSON.stringify({}));
  }

  // Obtener carrito desde Local Storage ordenado
  getCart() {
    // Si no existe carrito en Local Storage crear uno vacío
    if (localStorage.getItem(this.CART_KEY) === null) {
      localStorage.setItem(this.CART_KEY, JSON.stringify({}));
    }
    // Regresar carrito ordenado
    return this.helperService.orderObject(JSON.parse(localStorage.getItem(this.CART_KEY)));
  }
}
