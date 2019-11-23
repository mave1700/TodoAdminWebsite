import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserForCreation } from '../../_interfaces/user-for-creation.model';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  public errorMessage = '';

  public userForm: FormGroup;

  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.maxLength(45), Validators.minLength(1)]),
      lastname: new FormControl('', [Validators.required, Validators.maxLength(45), Validators.minLength(1)]),
      dateOfBirth: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)])
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

  public executeDatePicker(event) {
    this.userForm.patchValue({ dateOfBirth: event });
  }

  public createUser(userFormValue) {
    if (this.userForm.valid) {
      this.executeUserCreation(userFormValue);
    }
  }

  private executeUserCreation(userFormValue) {
    const user: UserForCreation = {
      firstname: userFormValue.firstname,
      lastname: userFormValue.lastname,
      dateOfBirth: formatDate(userFormValue.dateOfBirth, 'yyyy-MM-dd', this.locale),
      username: userFormValue.username
    };

    const apiUrl = 'api/user';

    this.repository.create(apiUrl, user)
      .subscribe(res => {
        $('#successModal').modal();
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      );
  }

  public redirectToUserList() {
    this.router.navigate(['/user/list']);
  }

}
