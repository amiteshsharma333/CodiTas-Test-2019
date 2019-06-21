import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public baseUrl = `https://api.github.com/search/repositories`;
  public usersData= new EventEmitter<string>();
  public sortData= new EventEmitter<any>();

  constructor(private http: HttpClient) {}

  getUsers(name: string): Observable<any> {
    const url = `?q=${name}`;
    return this.http.get<any>(this.baseUrl + url);
  }
}
