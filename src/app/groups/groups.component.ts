import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../services/groups.service';
import { UsersService } from '../services/users.service';
import { ExpensesService } from '../services/expenses.service';
import { Iexpenses } from '../groups/iexpenses';
import { Iusergroup } from './iusergroup';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',

})
export class GroupsComponent implements OnInit {

  expensesList: Iexpenses;
  usersList: Iusergroup;
  usersGroupsList: any;
  newUserGroupForm: FormGroup;
  groupName: string;
  groupId: number;

  constructor(private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _groupsService: GroupsService,
    private _usersService: UsersService,
    private _expensesService: ExpensesService,
    private _router: Router) { }

  ngOnInit() {
    this.refreshExpensesList();
    this.refreshUsersGroupsList();
    this.refreshUsersList();

    this._activatedRoute.params.subscribe(g => this.groupId = g['groupId']);
    this._activatedRoute.params.subscribe(g => this.groupName = g['groupName']);

  }

  refreshExpensesList() {
    this._expensesService.getExpensesList()
      .subscribe(data => this.expensesList = data['records']);
  }

  test() {
    let paidSum = 0;
    let debtSum = 0;

    for (let i = 0; i < this.usersGroupsList.length; i++) {
      if (this.usersGroupsList[i].groupId === this.groupId ) {
        paidSum += Number(this.usersGroupsList[i].paid);
        debtSum += Number(this.usersGroupsList[i].debt);
      }
    }
    const bilans = paidSum + (debtSum * -1);
    console.log('Bilans: ' + bilans);
    for (let i = 0; i < this.usersGroupsList.length; i++) {
      if (this.usersGroupsList[i].groupId === this.groupId ) {
        // Sprawdzamy czy uzytkownik wydał mniej

      }
    }

  }

  refreshUsersGroupsList() {
    this._groupsService.getUsersGroupsList()
      .subscribe(data => this.usersGroupsList = data['records']);
      this.newUserGroupForm = this._formBuilder.group({
        userId: ['', Validators.required],
        groupId: ['', Validators.required],
      });
  }

  refreshUsersList() {
    this._usersService.getUsersList()
      .subscribe(data => this.usersList = data['records']);
  }

  addNewUserGroup() {
    this.newUserGroupForm.value.groupId = this.groupId;
    this._groupsService.insertToUsersGroupsList(this.newUserGroupForm.value)
    .subscribe(
      response => {
        console.log(this.newUserGroupForm.value);
              console.log(response);
              this.refreshUsersGroupsList();
          },
      error => console.log(error));
  }

  removeUserGroup(userId) {
    this._groupsService.removeUserGroup(this.groupId, userId)
      .subscribe(response => {
        console.log(response);
        this.refreshUsersGroupsList();
       },
      error => console.log(error));
  }




}
