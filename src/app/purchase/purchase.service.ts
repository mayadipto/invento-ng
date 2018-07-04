import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {server} from '../constants';
import {forEach} from '@angular/router/src/utils/collection';
import {PurchaseInvoice} from '../models/purchaseInvoice.model';
import {Url} from '../models/Url.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(
    private http: HttpClient
  ) { }
  getPurchases(nextUrl: string): any {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    );
    let url = server + '/purchases';
    if (nextUrl != null) {
      url = nextUrl;
    }
    return this.http.get(url, {headers: headers});
  }
  getItemsByName(name: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    );
    return this.http.get(server + '/items/code/' + name, {headers: headers});
  }
  getSupplierByName(name: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    );
    return this.http.get(server + '/suppliers/by-name/' + name, {headers: headers});
  }

  createPurchaseInvoice(puchaseInvoice: PurchaseInvoice) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    );
    return this.http.post(server + '/purchases/invoice', puchaseInvoice, {headers: headers});
  }

  getAllPurchaseInvoice(url: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    );
    if (url == null) {
      url = server + '/purchases/invoice';
    }
    return this.http.get(url, {headers: headers});
  }
  getInvoiceDetails(id) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    );
    return this.http.get(server + '/purchases/invoice/' + id, {headers: headers});
  }
}
