import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GroupsService } from './groups/groups.service';
import { UsersService } from './users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GroupsService, UsersService]
})
export class AppComponent implements OnInit {

    constructor() { }

    ngOnInit() {

    }




}
