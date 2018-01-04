import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../services/groups.service';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  usersGroupsList: any;
  usersList;
  userId: number;

  constructor(private _activatedRoute: ActivatedRoute,
    private _groupsService: GroupsService,
    private _usersService: UsersService,
    private _router: Router) { }

  ngOnInit() {
    this.refreshUsersGroupsList();
    this.refreshUsersList();
    this._activatedRoute.params.subscribe(g => this.userId = g['userId']);
  }

  refreshUsersGroupsList() {
    this._groupsService.getUsersGroupsList()
      .subscribe(data => this.usersGroupsList = data['records']);
  }

  refreshUsersList() {
    this._usersService.getUsersList()
      .subscribe(data => this.usersList = data['records']);
  }
  removeUserGroup(groupId) {
    this._groupsService.removeUserGroup(groupId, this.userId)
      .subscribe(response => {
        console.log(response);
        this.refreshUsersGroupsList();
       },
      error => console.log(error));
  }



}
