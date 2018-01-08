import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Iexpenses } from '../groups/iexpenses';
import { ExpensesService } from '../services/expenses.service';
import { GroupsService } from './groups.service';
import { UsersService } from '../services/users.service';
import { OwesService } from '../services/owes.service';
import { Iusergroup } from './iusergroup';
import { Iuser } from '../users/iuser';
import { setTimeout } from 'timers';
import { map } from 'rxjs/operator/map';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',

})
export class GroupsComponent implements OnInit {

  expensesList: any;
  usersList: Iuser;
  usersGroupsList;
  newUserGroupForm: FormGroup;
  groupName: string;
  groupId: number;
  newBillName: string;
  newBillAmount: number;
  owesList;

  constructor(private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _oweService: OwesService,
    private _groupsService: GroupsService,
    private _usersService: UsersService,
    private _expensesService: ExpensesService,
    private _router: Router) { }

  ngOnInit() {
    this.refreshExpensesList();
    this.refreshUsersGroupsList();
    this.refreshUsersList();
    this.refreshOwesList();
    this._activatedRoute.params.subscribe(g => this.groupId = g['groupId']);
    this._activatedRoute.params.subscribe(g => this.groupName = g['groupName']);
  }

  refreshExpensesList() {
    this._expensesService.getExpensesList()
      .subscribe(data => this.expensesList = data['records']);
  }

  refreshOwesList() {
    this._oweService.getOwesList()
      .subscribe(data => this.owesList = data['records']);
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

  addNewExpense(newBill) {
    this._expensesService.insertExpensesList(newBill)
      .subscribe(response => {
        console.log('1');
        this.refreshExpensesList();
      },
      error => console.log(error));
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

  addNewOwe(newOwe) {
    setTimeout(() => {
      this._oweService.insertOweToList(newOwe)
      .subscribe(response => {
        console.log('2');
        this.refreshOwesList();
      },
    error => console.log(error));
    }, 2000);

  }

  removeExpense(expenseId) {
    this._oweService.deleteOweByExpenseId(expenseId)
    .subscribe(response => {
      console.log('owe usunięty');
      this.refreshOwesList();
      this._expensesService.deleteExpense(expenseId)
      .subscribe(callback => {
        console.log('Expense usunięty');
        this.refreshExpensesList();
      },
      error => console.log(error));
    },
    error => console.log(error));
  }

  addNewBill() {
    let paidSum = 0;
    let debtSum = 0;
    for (let i = 0; i < this.usersGroupsList.length; i++) {
      if (this.usersGroupsList[i].groupId === this.groupId ) {
        paidSum += Number(this.usersGroupsList[i].paid);
        debtSum += Number(this.usersGroupsList[i].debt);
        this.usersGroupsList[i].balans = this.usersGroupsList[i].paid - this.usersGroupsList[i].debt;
      }
    }
    let expenseId: number;
              if (this.expensesList) {
                expenseId = Number(this.expensesList[this.expensesList.length - 1].id) + 1;
              }else {
                expenseId = 1;
              }
              console.log(expenseId);

    const bilans = paidSum - debtSum;
    if (this.newBillAmount - paidSum === 0 && bilans === 0 && this.newBillName !== '') {
      for (let i = 0; i < this.usersGroupsList.length; i++) {
        if (this.usersGroupsList[i].groupId === this.groupId ) {
          if (this.usersGroupsList[i].balans < 0) {
            for (let j = 0; j < this.usersGroupsList.length; j++) {
              if (this.usersGroupsList[j].balans > 0) {
                const newOwe = {userId: this.usersGroupsList[j].userId, debtorId: this.usersGroupsList[i].userId,
                  amount: (this.usersGroupsList[i].balans * -1), expenseId: expenseId};
                if (this.usersGroupsList[j].balans >=  this.usersGroupsList[i].balans * -1) {
                  this.addNewOwe(newOwe);
                  this.usersGroupsList[j].balans -= this.usersGroupsList[i].balans * -1;
                  this.usersGroupsList[i].balans = 0;
                }else {
                  this.addNewOwe(newOwe);
                  this.usersGroupsList[i].balans += this.usersGroupsList[j].balans;
                  this.usersGroupsList[j].balans = 0;
                }
              }
            }
          }
        }
      }
      const newBill = {id: expenseId, name: this.newBillName, amount: this.newBillAmount, groupId: this.groupId, date: new Date()};
            this.addNewExpense(newBill);
    }else {
      alert('Kwota rachunku nie zgadza się z podanymi kwotami w formularzu, lub bilans tych kwot jest nierowny!');
    }

  }




}
