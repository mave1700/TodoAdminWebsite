import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'list', component: UserListComponent }
    ])
  ],
  declarations: [UserListComponent, UserDetailsComponent]
})
export class UserModule { }
