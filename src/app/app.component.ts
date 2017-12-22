import { Component, OnInit } from '@angular/core';
import { Iuser } from './users/iuser';
import { UsersService } from './users/users.service';
import { Igroup } from './groups/igroup';
import { GroupsService } from './groups/groups.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    usersList: Iuser[];
    groupsList: Igroup[];

    constructor(private _usersService: UsersService,
        private _groupsService: GroupsService) { }

    ngOnInit() {
        this._usersService.getUsersList()
        .subscribe(users =>
            this.usersList = users['records']
        );
        this._groupsService.getGroupsList()
        .subscribe(groups =>
            this.groupsList = groups['records']
        );

    }
}
