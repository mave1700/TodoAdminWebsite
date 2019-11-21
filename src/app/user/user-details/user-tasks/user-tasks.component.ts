import { Component, OnInit, Input } from '@angular/core';
import { Task } from "./../../../_interfaces/task.model";

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css']
})
export class UserTasksComponent implements OnInit {
  @Input() public tasks: Task[] = [];

  constructor() { }

  ngOnInit() {
  }

}
