import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Iexpenses } from '../groups/iexpenses';
import { ExpensesService } from '../services/expenses.service';
import { GroupsService } from './groups.service';
import { UsersService } from '../services/users.service';
import { Iusergroup } from './iusergroup';


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
  newBillName: string;
  newBillAmount: number;
  newBill;

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

  removeExpense(userId) {
    this._expensesService.deleteExpense(userId)
      .subscribe(response => {
        console.log('Expense usunięty');
        this.refreshExpensesList();
      },
      error => console.log(error));
  }

  test() {
    let paidSum = 0;
    let debtSum = 0;

    for (let i = 0; i < this.usersGroupsList.length; i++) {
      if (this.usersGroupsList[i].groupId === this.groupId ) {
        paidSum += Number(this.usersGroupsList[i].paid);
        debtSum += Number(this.usersGroupsList[i].debt);
        this.usersGroupsList[i].balans = this.usersGroupsList[i].paid - this.usersGroupsList[i].debt;
      }
    }
    this.newBill = {name: this.newBillName, amount: this.newBillAmount, groupId: this.groupId, date: new Date()};
    this.addNewExpense(this.newBill);
    const bilans = paidSum - debtSum;
    if (this.newBillAmount - paidSum === 0 && bilans === 0 && this.newBillName !== '') {
      for (let i = 0; i < this.usersGroupsList.length; i++) {
        // Sprawdzamy czy użytkowniky należy do grupy
        if (this.usersGroupsList[i].groupId === this.groupId ) {
          // Sprawdzamy czy uzytkownik zaplacił mniej niż wydał
          if (this.usersGroupsList[i].balans < 0) {
            console.log(this.usersGroupsList[i].userName + ' zapłacił mniej niż powinien, więc szukamy kto zapłacił więcej');
            // Szukamy osoby ktora zapłaciła więcej
            for (let j = 0; j < this.usersGroupsList.length; j++) {
              if (this.usersGroupsList[j].balans > 0) {
                console.log(this.usersGroupsList[j].userName + ' zapłacił więcej niż powinien');
                //sprawdzamy czy kwota platnika pokrywa kwotę osoby winnej
                if (this.usersGroupsList[j].balans >=  this.usersGroupsList[i].balans * -1) {
                  console.log(`${this.usersGroupsList[i].userName} jest winien ${this.usersGroupsList[i].balans * -1} ${this.usersGroupsList[j].userName}`);
                  this.usersGroupsList[j].balans -= this.usersGroupsList[i].balans * -1;
                  this.usersGroupsList[i].balans = 0;
                  console.log(`${this.usersGroupsList[j].userName} balans wynosi ${this.usersGroupsList[j].balans}`);
                  console.log(`${this.usersGroupsList[i].userName} balans wynosi ${this.usersGroupsList[i].balans}`);
                }else {
                  console.log(`${this.usersGroupsList[i].userName} jest winien ${this.usersGroupsList[j].balans} użytownikowi ${this.usersGroupsList[j].userName}`);
                  this.usersGroupsList[i].balans += this.usersGroupsList[j].balans;
                  this.usersGroupsList[j].balans = 0;
                  console.log(this.usersGroupsList[i].userName + ' balans wynosi ' + this.usersGroupsList[i].balans);
                  console.log(this.usersGroupsList[j].userName + ' balans wynosi ' + this.usersGroupsList[j].balans);
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
