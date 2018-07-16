import { Component, OnInit, Input } from '@angular/core';
import { HelperService } from '../services/helpers.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  badgeCount = 0;
  @Input() shoppingCart: Object;

  constructor(private helper: HelperService) { }

  ngOnInit() {
    if (this.helper.objectLength(this.shoppingCart) > 0) {
        this.badgeCount = this.helper.objectLength(this.shoppingCart);
    }
  }
  isCartEmpty(){
      return this.helper.isObjectEmpty(this.shoppingCart);
  }
  cartLength(){
      return this.helper.objectLength(this.shoppingCart);
  }

}
