import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { GroupsService } from '../groups/groups.service';
import { UsersService } from './shared/users.service';
import { Iowes} from '../owes/iowes';
import { OwesService } from '../owes/owes.service';
import { Iuser } from './shared/iuser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  usersGroupsList: any;
  usersList: Iuser;
  userId: number;
  owesList: Iowes;
  owesGroupByList;
  userName: string;

  constructor(private activatedRoute: ActivatedRoute,
    private groupsService: GroupsService,
    private usersService: UsersService,
    private owesListService: OwesService,
    private router: Router) { }

  ngOnInit() {
    this.refreshUsersGroupsList();
    this.refreshUsersList();
    this.refreshOwesList();
    this.refreshOwesGrouByAmountList();
    this.activatedRoute.params.subscribe(g => this.userId = g['userId']);
    this.activatedRoute.params.subscribe(g => this.userName = g['userName']);
  }

  refreshOwesGrouByAmountList() {
    this.owesListService.getOwesGroupByAmountList()
      .subscribe(data => this.owesGroupByList = data['records']);
  }

  refreshUsersGroupsList() {
    this.groupsService.getUsersGroupsList()
      .subscribe(data => this.usersGroupsList = data['records']);
  }

  refreshUsersList() {
    this.usersService.getUsersList()
      .subscribe(data => this.usersList = data['records']);
  }

  refreshOwesList() {
    this.owesListService.getOwesList()
      .subscribe(data => this.owesList = data['records']);
  }

  removeUserGroup(groupId) {
    this.groupsService.removeUserGroup(groupId, this.userId)
      .subscribe(response => {
        console.log(response);
        this.refreshUsersGroupsList();
       },
      error => console.log(error));
  }



}
