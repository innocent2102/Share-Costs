import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { GroupsService } from '../groups/groups.service';
import { UsersService } from '../users/users.service';
import { Iowes} from './shared/iowes';
import { OwesService } from './shared/owes.service';
import { Iuser } from '../users/iuser';

@Component({
  selector: 'app-users',
  templateUrl: './owes.component.html',
})
export class OwesComponent implements OnInit {
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
    this.refreshOwesGroupBy();
    this.activatedRoute.params.subscribe(g => this.userId = g['userId']);
    this.activatedRoute.params.subscribe(g => this.userName = g['userName']);
  }

  refreshOwesGroupBy() {
    this.owesListService.getOwesGroupBy()
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
