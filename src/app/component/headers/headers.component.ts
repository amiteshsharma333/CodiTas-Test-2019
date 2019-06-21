import { Component, OnInit } from '@angular/core';

import { UserService } from './../../services/users/user.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent {
  searchText: string;
  constructor(private userService: UserService) { }

  getUsersDetails() {
    this.userService.usersData.emit(this.searchText);
  }
  sortBy(value: any) {
    this.userService.usersData.emit(value);
  }

}
