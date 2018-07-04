import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {server} from '../constants';
import {SellInvoice} from '../models/sell-invoice.model';

@Injectable({
  providedIn: 'root'
})
export class SellService {

  constructor(private http: HttpClient) { }
  getAllInvoices(nextPage: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    );
    let url = server + '/sells/invoices';
    if (nextPage != null) {
      url = nextPage;
    }
    return this.http.get(url, {headers: headers});
  }
  getInvoice(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    );
    let url = server + '/sells/invoices/' + id;
    return this.http.get(url, {headers: headers});
  }

  getCustomerByContact(contact: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    );
    return this.http.get(server + '/customers/contact/' + contact, {headers: headers});
  }

  createNewSell(sellInvoice: SellInvoice) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    );
    return this.http.post(server + '/sells/invoices', sellInvoice, {headers: headers});
  }
}
