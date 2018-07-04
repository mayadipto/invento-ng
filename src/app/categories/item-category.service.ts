import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {server} from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ItemCategoryService {

  constructor(private http: HttpClient) { }
  getRawmaterialCategories() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    );
    return this.http.get(server + '/item-categories/rawmaterials', {headers: headers});
  }
  getProductCategories() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    );
    return this.http.get(server + '/item-categories/products', {headers: headers});
  }
}
