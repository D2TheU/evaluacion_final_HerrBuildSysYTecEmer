import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  filter = '';
  products = {
    aguacate: { name: "Aguacate", file: "aguacate.jpg", price: 1, quantity: 0, count: 1 },
    ajo: { name: "Ajo", file: "ajo.jpg", price: 2, quantity: 98, count: 1 },
    almendras: { name: "Almendras", file: "almendras.jpg", price: 3, quantity: 100, count: 1 },
    arandanos: { name: "Arándanos", file: "arandanos.jpg", price: 4, quantity: 100, count: 1 },
    brocoli: { name: "Brócoli", file: "brocoli.png", price: 5, quantity: 100, count: 1 },
    calabaza: { name: "Calabaza", file: "calabaza.jpg", price: 6, quantity: 100, count: 1 },
    canela: { name: "Canela", file: "canela.jpg", price: 7, quantity: 100, count: 1 },
    cebolla: { name: "Cebolla", file: "cebolla.jpg", price: 8, quantity: 100, count: 1 },
    fresa: { name: "Fresa", file: "fresa.jpg", price: 9, quantity: 100, count: 1 },
    kiwi: { name: "Kiwi", file: "kiwi.jpg", price: 10, quantity: 100, count: 1 },
    limon: { name: "Limón", file: "limon.jpg", price: 11, quantity: 100, count: 1 },
    lychee: { name: "Lychee", file: "lychee.jpg", price: 12, quantity: 100, count: 1 },
    maiz: { name: "Maíz", file: "maiz.jpg", price: 13, quantity: 100, count: 1 },
    manzana: { name: "Manzana", file: "manzana.jpg", price: 14, quantity: 100, count: 1 },
    naranja: { name: "Naranja", file: "naranja.jpg", price: 15, quantity: 100, count: 1 },
    papa: { name: "Papa", file: "papa.jpg", price: 16, quantity: 100, count: 1 },
    pasta: { name: "Pasta", file: "pasta.jpg", price: 17, quantity: 100, count: 1 },
    pimienta: { name: "Pimienta", file: "pimienta.jpg", price: 18, quantity: 100, count: 1 },
    repollo: { name: "Repollo", file: "repollo.jpg", price: 19, quantity: 100, count: 1 },
    tomate: { name: "Tomate", file: "tomate.jpg", price: 20, quantity: 100, count: 1 },
    zanahoria: { name: "Zanahoria", file: "zanahoria.jpg", price: 21, quantity: 100, count: 1 }
  };
  details = false;
  detailProduct = {};
  shoppingCart = {};

  constructor() {
    console.log(this.products)
  }

  ngOnInit() {
  }

  onFilter(value) {
      this.filter = value.trim();
  }

}
