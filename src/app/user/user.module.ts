import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserTasksComponent } from './user-details/user-tasks/user-tasks.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'list', component: UserListComponent },
      { path: 'details/:id', component: UserDetailsComponent },
      { path: 'create', component: UserCreateComponent },
      { path: 'update/:id', component: UserUpdateComponent },
      { path: 'delete/:id', component: UserDeleteComponent }

    ])
  ],
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    UserTasksComponent,
    UserCreateComponent,
    UserUpdateComponent,
    UserDeleteComponent]
})
export class UserModule { }
