import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { User } from './../../_interfaces/user.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {
  public errorMessage = '';
  public user: User;

  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private activeRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.getUserById();
  }

  private getUserById() {
    const userId: string = this.activeRoute.snapshot.paramMap.get('id');
    const userByIdUrl = `api/user/${userId}`;

    this.repository.getData(userByIdUrl)
      .subscribe(res => {
        this.user = res as User;
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        });
  }

  public redirectToUserList() {
    this.router.navigate(['/user/list']);
  }

  public deleteUser() {
    const deleteUrl = `api/user/${this.user.id}`;
    this.repository.delete(deleteUrl)
      .subscribe(res => {
        $('#successModal').modal();
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }

}
