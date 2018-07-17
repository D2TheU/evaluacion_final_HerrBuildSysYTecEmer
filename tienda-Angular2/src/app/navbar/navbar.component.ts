import { Component, OnInit, Input } from '@angular/core';
import { HelperService } from '../services/helpers.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Input de carrito de componente padre
  @Input() shoppingCart: Object;

  constructor(private helper: HelperService) { }

  ngOnInit() { }

  // Función para regresar si el carrito está vacío
  isCartEmpty() {
    return this.helper.isObjectEmpty(this.shoppingCart);
  }

  // Función para regresar tamaño del carrito
  cartLength() {
    return this.helper.objectLength(this.shoppingCart);
  }

}
