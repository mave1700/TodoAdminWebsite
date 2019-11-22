import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../../_interfaces/user.model';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  public errorMessage = '';
  public user: User;
  public userForm: FormGroup;

  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(45), Validators.minLength(1)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(45), Validators.minLength(1)]),
      age: new FormControl('', [Validators.required, Validators.maxLength(3), Validators.minLength(1)])
    });
  }

  private getUserById() {
    const userId: string = this.activeRoute.snapshot.paramMap.get('id');
    const userByIdUrl = `api/user/${userId}`;

    this.repository.getData(userByIdUrl)
      .subscribe(res => {
        this.user = res as User;
        this.userForm.patchValue(this.user);
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        });
  }

  public validateControl(controlName: string) {
    if (this.userForm.controls[controlName].invalid && this.userForm.controls[controlName].touched) {
      return true;
    }
    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.userForm.controls[controlName].hasError(errorName)) {
      return true;
    }
    return false;
  }

  public redirectToUserList() {
    this.router.navigate(['/user/list']);
  }

  public updateUser(userFormValue) {
    if (this.userForm.valid) {
      this.executeUserUpdate(userFormValue);
    }
  }

  private executeUserUpdate(userFormValue) {
    this.user.firstname = userFormValue.firstname;
    this.user.lastname = userFormValue.lastname;
    this.user.age = userFormValue.age;

    const apiUrl = `api/user/${this.user.id}`;
    this.repository.update(apiUrl, this.user)
      .subscribe(res => {
        $('#successModal').modal();
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        }
      );
  }

}
