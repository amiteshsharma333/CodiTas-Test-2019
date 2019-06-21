import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  public baseUrl = `https://api.github.com/search/repositories`;

  constructor(private http: HttpClient) {}

  getUsers(page: number, tetris: string): Observable<any> {
    const url = `?q=${tetris}+language:assembly&sort=stars&order=desc&page=${page}`;
    return this.http.get<any>(this.baseUrl + url);
  }
}
