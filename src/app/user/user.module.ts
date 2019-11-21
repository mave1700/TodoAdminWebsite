import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';

import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserTasksComponent } from './user-details/user-tasks/user-tasks.component';
import { UserCreateComponent } from './user-create/user-create.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'list', component: UserListComponent },
      { path: 'details/:id', component: UserDetailsComponent },
      { path: 'create', component: UserCreateComponent }
    ])
  ],
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    UserTasksComponent,
    UserCreateComponent]
})
export class UserModule { }
