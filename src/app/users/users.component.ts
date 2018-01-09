import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../groups/shared/groups.service';
import { UsersService } from './shared/users.service';
import { Iowes} from './shared/iowes';
import { OwesService } from '../services/owes.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  usersGroupsList: any;
  usersList;
  userId: number;
  owesList: any;
  owesGroupByList: any;
  userName: string;

  constructor(private _activatedRoute: ActivatedRoute,
    private _groupsService: GroupsService,
    private _usersService: UsersService,
    private _owesListService: OwesService,
    private _router: Router) { }

  ngOnInit() {
    this.refreshUsersGroupsList();
    this.refreshUsersList();
    this.refreshOwesList();
    this.refreshOwesGrouByAmountList();
    this._activatedRoute.params.subscribe(g => this.userId = g['userId']);
    this._activatedRoute.params.subscribe(g => this.userName = g['userName']);
  }

  refreshOwesGrouByAmountList() {
    this._owesListService.getOwesGroupByAmountList()
      .subscribe(data => this.owesGroupByList = data['records']);
  }

  refreshUsersGroupsList() {
    this._groupsService.getUsersGroupsList()
      .subscribe(data => this.usersGroupsList = data['records']);
  }

  refreshUsersList() {
    this._usersService.getUsersList()
      .subscribe(data => this.usersList = data['records']);
  }

  refreshOwesList() {
    this._owesListService.getOwesList()
      .subscribe(data => this.owesList = data['records']);
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
