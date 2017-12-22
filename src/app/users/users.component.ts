import { Component, OnInit } from '@angular/core';
import { Iuser } from './iuser';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

    usersList: Iuser[];

    constructor(private _usersService: UsersService) { }

    ngOnInit() {
      this._usersService.getUsersList()
        .subscribe(users =>
            this.usersList = users['records']
        );
    }




}
