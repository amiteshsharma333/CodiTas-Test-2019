import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public baseUrl = 'https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc&page=';

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + page);
  }
}
