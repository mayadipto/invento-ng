import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {server} from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  user: User = {};
  constructor(private http: HttpClient) {
    if (localStorage.getItem('user_name')) {
      this.user.id = atob(localStorage.getItem('user_id'));
      this.user.name = atob(localStorage.getItem('user_name'));
      this.user.email = atob(localStorage.getItem('user_email'));
      this.user.role = parseInt(atob(localStorage.getItem('user_role')), 10);
      this.user.status = parseInt(atob(localStorage.getItem('user_status')), 10);
    }
  }
  login(user: User) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(server + '/auth/login', user, {headers: headers});
  }
  getUserInfo() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    );
    // console.log(headers);
    return this.http.post(server + '/auth/me', null, {headers: headers});
  }
  logout() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    );
    // console.log(headers);
    return this.http.post(server + '/auth/logout', null, {headers: headers});
  }
  signup(user: User) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    );
    // console.log(headers);
    return this.http.post(server + '/auth/signup', user, {headers: headers});
  }
  checkUserByEmail(email) {
    const body = {email: email};
    return this.http.post(server + '/auth/user', body);
  }
  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
  isAdmin() {
    if (localStorage.getItem('user_role')) {
      if ( parseInt(localStorage.getItem('user_role'), 10) >= 5) {
        return true;
      }
      return false;
    }
  }
}
