import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operator/map';

import { ExpensesService } from './shared/expenses.service';
import { GroupsService } from '../groups/groups.service';
import { OwesService } from '../owes/owes.service';
import { UsersService } from '../users/shared/users.service';
import { Iusergroup } from '../users/shared/iusergroup';
import { Iuser } from '../users/shared/iuser';
import { Iexpenses } from './shared/iexpenses';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html'
})
export class ExpensesComponent implements OnInit {

    expensesList;
    owesList;
    usersList: Iuser;
    usersGroupsList;
    newUserGroupForm: FormGroup;
    groupName: string;
    groupId: number;
    newBillName: string;
    newBillAmount: number;

    constructor(private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private oweService: OwesService,
        private groupsService: GroupsService,
        private usersService: UsersService,
        private expensesService: ExpensesService,
        private router: Router) { }

    ngOnInit() {
        this.refreshExpensesList();
        this.refreshUsersGroupsList();
        this.refreshUsersList();
        this.refreshOwesList();
        this.activatedRoute.params.subscribe(g => this.groupId = g['groupId']);
        this.activatedRoute.params.subscribe(g => this.groupName = g['groupName']);
    }

    refreshExpensesList() {
        this.expensesService.getExpensesList()
        .subscribe(data => this.expensesList = data['records']);
    }

    refreshOwesList() {
        this.oweService.getOwesList()
        .subscribe(data => this.owesList = data['records']);
    }

    refreshUsersGroupsList() {
        this.groupsService.getUsersGroupsList()
        .subscribe(data => this.usersGroupsList = data['records']);
        this.newUserGroupForm = this.formBuilder.group({
            userId: ['', Validators.required],
            groupId: ['', Validators.required],
        });
    }

    refreshUsersList() {
        this.usersService.getUsersList()
        .subscribe(data => this.usersList = data['records']);
    }

    addNewUserGroup() {
        this.newUserGroupForm.value.groupId = this.groupId;
        this.groupsService.insertToUsersGroupsList(this.newUserGroupForm.value)
        .subscribe(
        response => {
            console.log(this.newUserGroupForm.value);
                console.log(response);
                this.refreshUsersGroupsList();
            },
        error => console.log(error));
    }

    removeUserGroup(userId) {
        this.groupsService.removeUserGroup(this.groupId, userId)
        .subscribe(response => {
            console.log(response);
            this.refreshUsersGroupsList();
        },
        error => console.log(error));
    }

    addNewOwe(newOwe) {
        this.oweService.insertOweToList(newOwe)
        .subscribe(response => {
            this.refreshOwesList();
        },
        error => console.log(error));
    }

    removeExpense(expenseId) {
        this.oweService.deleteOweByExpenseId(expenseId)
        .subscribe(response => {
            this.refreshOwesList();
            this.expensesService.deleteExpense(expenseId)
            .subscribe(callback => {
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
        const newBill = {id: expenseId, name: this.newBillName, amount: this.newBillAmount, groupId: this.groupId, date: new Date()};
        const bilans = paidSum - debtSum;
        if (this.newBillAmount - paidSum === 0 && bilans === 0 && this.newBillName !== '') {
            this.expensesService.insertExpensesList(newBill)
                .subscribe(response => {
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
                    this.refreshExpensesList();
                },
            error => console.log(error));
        }else {
            alert('Kwota rachunku nie zgadza się z podanymi kwotami w formularzu, lub bilans tych kwot jest nierowny!');
        }
    }


}
