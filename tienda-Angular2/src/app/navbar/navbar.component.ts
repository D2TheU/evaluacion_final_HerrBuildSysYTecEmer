import { Component, OnInit, Input } from '@angular/core';
import { HelperService } from '../services/helpers.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showBadge = false;
  badgeCount = 0;
  @Input() shoppingCart: Object;

  constructor(private helper: HelperService) { }

  ngOnInit() {
    if (this.helper.objectLength(this.shoppingCart) > 0) {
        this.showBadge = true;
        this.badgeCount = this.helper.objectLength(this.shoppingCart);
    }
  }

}
