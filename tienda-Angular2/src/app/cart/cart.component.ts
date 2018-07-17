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

  // Propiedades para Componente de Carrito
  shoppingCart = {};

  constructor(private cartService: CartService, private httpService: HttpService, private helperService: HelperService) {
    // Obtener carrito de Local Storage.
    this.shoppingCart = cartService.getCart();
  }

  ngOnInit() {
  }

  // Función para regresar si el carrito está vacío
  isCartEmpty() {
    return this.helperService.isObjectEmpty(this.shoppingCart);
  }

  // Función para obtener el total de los productos del carrito
  getTotal() {
    let total = 0;
    // Ciclar por carrito de compras
    for (let item in this.shoppingCart) {
      // Sumar al total el producto de la cantidad del producto en carrito por su precio
      total += this.shoppingCart[item].quantity * this.shoppingCart[item].price;
    }
    return total;
  }

  // Función para cancelar carrito, vaciando carrito del componente y de Local Storage
  cancel() {
    this.shoppingCart = {};
    this.cartService.emptyCart();
  }

  // Función para pagar, actualizando productos en base de datos, vaciando carrito del componente y de Local Storage
  pay() {
    // Obtener productos de base de datos
    this.httpService.getProducts()
      .subscribe(
        (data: Response) => {
          // Ciclar por los productos de base de datos
          for (let id in data) {
            // Obtener nombre en minúsculas y sin caracteres especiales
            let name = this.helperService.removeSpecialChr(data[id].name.toLowerCase());
            // Ciclar el carrito de compras
            for (let item in this.shoppingCart) {
              // Verificar si el producto está en el carrido de compras(item es igual al nombre en minusculas y sin caracteres especiales)
              if (name == item) {
                // Modificar el objeto con la nueva cantidad, quitando la que se compró
                data[id] = {
                  file: this.shoppingCart[item].file,
                  name: this.shoppingCart[item].name,
                  price: this.shoppingCart[item].price,
                  quantity: data[id].quantity - this.shoppingCart[item].quantity
                }
              }
            }
          }
          // Se manda lista actualizada a la base de datos
          this.httpService.updateProducts(data)
            .subscribe(
              (data: Response) => {
                // Si el estado es 200 quiere decir que todo salió bien, de lo contrario mostrar error.
                if (data.status == 200) {
                  this.shoppingCart = {};
                  this.cartService.emptyCart();
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
