import { Component, OnInit } from '@angular/core';
import { RepositoryService } from './../../shared/services/repository.service';
import { User } from './../../_interfaces/user.model';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users: User[];
  public errorMessage = '';

  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router) { }

  ngOnInit() {
    this.getAllUsers();
  }

  public getAllUsers() {
    const apiAddress = 'api/user';
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.users = res as User[];
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        });
  }

  public getUserDetails(id) {
    const detailsUrl = `/user/details/${id}`;
    this.router.navigate([detailsUrl]);
  }

  redirectToUpdatePage(id) {
    const updateUrl = `/user/update/${id}`;
    this.router.navigate([updateUrl]);
  }

}
