import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../services/groups.service';
import { UsersService } from '../services/users.service';
import { ExpensesService } from '../services/expenses.service';
import { Iexpenses } from '../groups/iexpenses';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
})
export class GroupsComponent implements OnInit {

  expensesList: Iexpenses;
  usersList;
  usersGroupsList: any;
  newUserGroupForm: FormGroup;
  newBillForm: FormGroup;
  groupName: string;
  groupId: number;
  test: string;

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

    this.newBillForm = this._formBuilder.group({
      value1: ['', Validators.required],
      value2: ['', Validators.required],
    });

  }



 showName(sda) {
   console.log(sda);
 }

  addNewBill() {
    this.showName(this.test);

  }

  refreshExpensesList() {
    this._expensesService.getExpensesList()
      .subscribe(data => this.expensesList = data['records']);
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
