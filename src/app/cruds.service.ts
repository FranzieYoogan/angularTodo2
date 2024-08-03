import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudsService {

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {

   return this.http.get('http://localhost:3000/todo')

  }

  postData(body:any): Observable<any> {

    return this.http.post(`https://jsonplaceholder.typicode.com/posts/`,body)
  }


  }

