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
    this._activatedRoute.params.subscribe(g => this.groupId = g['groupId']);
    this._activatedRoute.params.subscribe(g => this.groupName = g['groupName']);
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

  addNewExpense(newBill) {
    this._expensesService.insertExpensesList(newBill)
      .subscribe(response => {
        console.log('rachunek dodany');
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
    this._oweService.insertOweToList(newOwe)
      .subscribe(response => {
        console.log('Dług dodany');
        this._oweService.getOwesList();
      },
    error => console.log(error));
  }

  removeExpense(userId) {
    this._expensesService.deleteExpense(userId)
      .subscribe(response => {
        console.log('Expense usunięty');
        this.refreshExpensesList();
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
    const bilans = paidSum - debtSum;
    if (this.newBillAmount - paidSum === 0 && bilans === 0 && this.newBillName !== '') {
      for (let i = 0; i < this.usersGroupsList.length; i++) {
        if (this.usersGroupsList[i].groupId === this.groupId ) {
          if (this.usersGroupsList[i].balans < 0) {
            let expenseId;
              if (this.expensesList) {
                expenseId = this.expensesList[this.expensesList.length - 1].id;
              }else {
                expenseId = 1;
              }
            const newBill = {id: expenseId, name: this.newBillName, amount: this.newBillAmount, groupId: this.groupId, date: new Date()};
            this.addNewExpense(newBill);
            for (let j = 0; j < this.usersGroupsList.length; j++) {
              if (this.usersGroupsList[j].balans > 0) {

                if (this.usersGroupsList[j].balans >=  this.usersGroupsList[i].balans * -1) {
                  const newOwe = {userId: this.usersGroupsList[j].userId, debtorId: this.usersGroupsList[i].userId,
                  amount: (this.usersGroupsList[i].balans * -1), expenseId: expenseId};
                  this.addNewOwe(newOwe);
                  this.usersGroupsList[j].balans -= this.usersGroupsList[i].balans * -1;
                  this.usersGroupsList[i].balans = 0;
                }else {
                 const newOwe = {userId: this.usersGroupsList[j].userId, debtorId: this.usersGroupsList[i].userId,
                    amount: this.usersGroupsList[j].balans, expenseId: expenseId};
                    this.addNewOwe(newOwe);
                  this.usersGroupsList[i].balans += this.usersGroupsList[j].balans;
                  this.usersGroupsList[j].balans = 0;
                }
              }
            }
          }
        }
      }

    }else {
      alert('Kwota rachunku nie zgadza się z podanymi kwotami w formularzu, lub bilans tych kwot jest nierowny!');
    }

  }




}
