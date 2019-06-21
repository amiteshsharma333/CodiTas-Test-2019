import { Component, OnInit } from '@angular/core';

import { UserService } from './../../services/users/user.service';
import { UsersModel } from './../../models/users/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  usersDetail: UsersModel[];
  pagesArray = [];
  sorted: boolean;
  searchText: string;
  sortFilter: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsersDetails();
    this.getSearchString();
    this.getSortByData();
  }

  /**
   * Get user details
   */
  getUsersDetails() {
    this.userService
      .getUsers(this.searchText || 'amit')
      .subscribe(usersData => {
        this.formatResult(usersData);
        console.log(usersData.total_count.toString())
      });
  }

  /**
   * Format result
   */
  public formatResult(usersData) {
    const data: UsersModel[] = [];
    for (let i = 0; i < usersData.items.length - 1; i++) {
      if (
        (usersData.items[i].name &&
          usersData.items[i].full_name &&
          usersData.items[i].owner.avatar_url &&
          usersData.items[i].language &&
          usersData.items[i].watchers &&
          usersData.items[i].forks &&
          usersData.items[i].open_issues_count &&
          usersData.items[i].stargazers_count) ||
        []
      ) {
        data.push({
          name:
            usersData.items[i].name.charAt(0).toUpperCase() +
            usersData.items[i].name.slice(1),
          full_name: usersData.items[i].full_name,
          avatar_url: usersData.items[i].owner.avatar_url,
          language: usersData.items[i].language,
          watchers: usersData.items[i].watchers.toString(),
          forks: usersData.items[i].forks.toString(),
          open_issues_count: usersData.items[i].open_issues_count.toString(),
          stargazers_count: usersData.items[i].stargazers_count.toString(),
        });
      }
    }
    this.usersDetail = data;
    this.sortBy(this.sortFilter ? this.sortFilter : 'name');
  }

  /**
   * Sort data
   */
  public sortBy(name: string): void {
    this.usersDetail.sort((a: any, b: any) => {
      if (a[name] < b[name]) {
        return this.sorted ? 1 : -1;
      }
      if (a[name] > b[name]) {
        return this.sorted ? -1 : 1;
      }
      return 0;
    });

    this.sorted = !this.sorted;
  }

  /**
   * Filter data
   */
  filterData(usersArray, searchKey) {
    return usersArray.filter(obj =>
      Object.keys(obj).some(key => obj[key].includes(searchKey))
    );
  }

  /**
   * Search data
   */
  search() {
    if (!this.searchText) {
      return this.usersDetail;
    }
    if (this.searchText) {
      return this.filterData(this.usersDetail, this.searchText);
    }
  }

  getSearchString() {
    this.userService.usersData.subscribe(
      (data: string) => {
        this.searchText = data;
        this.getUsersDetails();
      });
  }

  getSortByData() {
    this.userService.sortData.subscribe(
      (data: any) => {
        this.sortFilter = data;
      });
  }
}
