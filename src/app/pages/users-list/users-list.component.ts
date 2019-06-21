import { Component, OnInit } from "@angular/core";

import { UserService } from "./../../services/users/user.service";
import { UsersModel } from "./../../models/users/user.model";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.css"]
})
export class UsersListComponent implements OnInit {
  usersDetail: UsersModel[];
  pagesArray = [];
  sorted: boolean;
  searchText: string;
  currentPage = 1;
  firstPage = 0;
  lastPage: number;
  nextPage: number;
  prevPage: number;
  totalCount: number;
  limit = 100;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsersDetails(this.currentPage);
  }

  /**
   * Get user details
   */
  getUsersDetails(page?) {
    console.log('called');
    this.currentPage = page;
    this.nextPage = page + 1;
    this.prevPage = page - 1;

    this.userService
      .getUsers(page, this.searchText || "")
      .subscribe(usersData => {
        this.formatResult(usersData);
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
          stargazers_count: usersData.items[i].stargazers_count.toString()
        });
      }
    }
    this.usersDetail = data;
    this.totalCount = usersData.total_count;
    this.lastPage = Math.ceil(this.totalCount / this.limit);
    this.pagesArray = new Array(this.lastPage);
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
}
