import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {server} from '../constants';
import {Url} from '../models/Url.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }
  uploadFiles(files) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'Authorization' : 'Bearer ' + token
      }
    );
    // console.log(files);
    let formData = new FormData();
    files.forEach(file => formData.append('image[]', file, file.name));
    let url = server + '/upload-files';
    return this.http.post(url, formData, {headers: headers});
  }
  deleteFile(file: Url, table: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    );
    return this.http.delete(server + '/delete-files/' + file.id + '/' + table, {headers: headers});
  }
}
