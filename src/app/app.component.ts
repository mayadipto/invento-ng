import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {PurchaseService} from './purchase/purchase.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Time} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  constructor(private purchaseService: PurchaseService) {}
  ngOnInit() {
    if (localStorage.getItem('token')) {
      const jwtHelper = new JwtHelperService();
      if (jwtHelper.isTokenExpired(localStorage.getItem('token'))) {
        localStorage.clear();
      }
    }
  }
  ngOnDestroy() {
    localStorage.clear();
  }
}
