import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { NavbarComponent } from './navbar/navbar.component';

import { HttpService } from './services/http.service';
import { HelperService } from './services/helper.service';

import { L3RoutingModule } from './app-routing.module';
import { KeyvaluePipe } from './keyvalue.pipe';
import { NoSpecialChrPipe } from './no-special-chr.pipe';
import { FilterProductPipe } from './filter-product.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CartComponent,
    NavbarComponent,
    KeyvaluePipe,
    NoSpecialChrPipe,
    FilterProductPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    L3RoutingModule
  ],
  providers: [HttpService, HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
