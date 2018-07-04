import { Injectable } from '@angular/core';
import {server} from '../constants';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ExpenseInvoice} from '../models/expense-invoice.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }
  getAllExpenseInvoice(nextPage: string) {
    let url = server + '/expenses/invoices';
    if (nextPage != null) {
      url = nextPage;
    }
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    );
    return this.http.get(url, {headers: headers});
  }
  getInvoiceDetails (id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    );
    return this.http.get(server + '/expenses/invoices/' + id, {headers: headers});
  }
  getEmployees(text) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    );
    return this.http.get(server + '/employees/' + text, {headers: headers});
  }

  createExpenseInvoice(invoice: ExpenseInvoice) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    );
    return this.http.post(server + '/expenses/invoices', invoice, {headers: headers});
  }
}
