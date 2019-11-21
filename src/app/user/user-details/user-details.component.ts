import { Component, OnInit } from '@angular/core';
import { User } from './../../_interfaces/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from './../../shared/services/repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  public user: User;
  public errorMessage = '';

  constructor(
    private repository: RepositoryService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    const id: string = this.activeRoute.snapshot.paramMap.get('id');
    const apiUrl = `api/user/${id}/account`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        this.user = res as User;
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        });
  }

}
