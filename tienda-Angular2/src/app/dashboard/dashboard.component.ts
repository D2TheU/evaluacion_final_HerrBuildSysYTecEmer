import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
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

  constructor(private httpService: HttpService, private helperService: HelperService) { }

  ngOnInit() {
      this.httpService.getProducts()
        .subscribe(
          (data: Response) => {
              let tempProducts = {};
            for (let id in data){
                let name = this.helperService.removeSpecialChr(data[id].name.toLowerCase());
                tempProducts[name] = data[id];
            }
            this.products = tempProducts;
            console.log(this.products);
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

  // addProduct(name, file, price) {
  //   this.httpService.sendProduct({ name: name, file: file, price: price, quantity: 100, count: 1 })
  //     .subscribe(
  //       (data: Response) => {
  //         console.log(data);
  //       }
  //     );
  // }

}
