import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../../_interfaces/user.model';
import { formatDate } from '@angular/common';

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
    private activeRoute: ActivatedRoute,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.maxLength(45), Validators.minLength(1)]),
      lastname: new FormControl('', [Validators.required, Validators.maxLength(45), Validators.minLength(1)]),
      dateOfBirth: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)])
    });
    this.getUserById();
  }

  private getUserById() {
    const userId: string = this.activeRoute.snapshot.paramMap.get('id');
    const userByIdUrl = `api/user/${userId}`;

    this.repository.getData(userByIdUrl)
      .subscribe(res => {
        this.user = res as User;
        this.userForm.patchValue(this.user);
        $('#dateOfBirth').val(formatDate(this.user.dateOfBirth, 'yyyy/MM/dd', this.locale));
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


  public executeDatePicker(event) {
    this.userForm.patchValue({ dateOfBirth: event });
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
    this.user.dateOfBirth = formatDate(userFormValue.dateOfBirth, 'yyyy-MM-dd', this.locale);
    this.user.username = userFormValue.username;

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
