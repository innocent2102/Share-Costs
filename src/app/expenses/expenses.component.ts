import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operator/map';

import { ExpensesService } from './shared/expenses.service';
import { GroupsService } from '../groups/groups.service';
import { OwesService } from '../owes/shared/owes.service';
import { UsersService } from '../users/users.service';
import { Iusergroup } from '../users/iusergroup';
import { Iuser } from '../users/iuser';
import { Iexpenses } from './shared/iexpenses';
import { Iowes } from '../owes/shared/iowes';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html'
})
export class ExpensesComponent implements OnInit {

    expensesList: Iexpenses[];
    usersList: Iuser[];
    usersGroupsList: Iusergroup[];
    newUserGroupForm: FormGroup;
    groupName: string;
    groupId: number;
    newBillName: string;
    newBillAmount: number;
    newUserId: number;

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
        this.activatedRoute.params.subscribe(g => this.groupId = g['groupId']);
        this.activatedRoute.params.subscribe(g => this.groupName = g['groupName']);
        this.usersService.getUsersList()
        .subscribe(data => this.usersList = data['records']);
    }

    refreshExpensesList() {
        this.expensesService.getExpensesList()
        .subscribe(data => this.expensesList = data['records']);
    }


    refreshUsersGroupsList() {
        this.groupsService.getUsersGroupsList()
        .subscribe(data => this.usersGroupsList = data['records']);
        this.newUserGroupForm = this.formBuilder.group({
            userId: ['', Validators.required],
            groupId: ['', Validators.required],
        });
    }

    addNewUserGroup() {
        let userExistInCurrentGroup = false;
        this.newUserGroupForm.value.groupId = this.groupId;
        for (let i = 0; i < this.usersGroupsList.length; i++) {
            if (this.newUserGroupForm.value.userId === this.usersGroupsList[i].userId && this.usersGroupsList[i].groupId === this.groupId) {
                userExistInCurrentGroup = true;
            }
        }
        if (userExistInCurrentGroup === false) {
            this.groupsService.insertToUsersGroupsList(this.newUserGroupForm.value)
            .subscribe(
            response => {
                    this.refreshUsersGroupsList();
                    alert('Użytkownik dodany do grupy');
                });
        }else {
            alert('Ten użytkownik należy już do grupy. Wybierz inną osobę, która nie należy do tej grupy');
        }
    }

    addNewShare(newShare) {
        this.expensesService.insertToUsersExpenses(newShare)
            .subscribe(response => {
            });
    }

    removeUserGroup(userId) {
        this.groupsService.removeUserGroup(this.groupId, userId)
        .subscribe(response => {
            this.refreshUsersGroupsList();
            alert('Użytkownik usunięty z grupy');
        });
    }

    addNewOwe(newOwe) {
        this.oweService.insertOweToList(newOwe)
        .subscribe(response => {
            this.oweService.getOwesList();
        });
    }

    removeExpense(expenseId) {
        this.expensesService.deleteUserExpense(expenseId)
        .subscribe( data => {
            this.oweService.deleteOweByExpenseId(expenseId)
            .subscribe(response => {
                this.oweService.getOwesList();
                this.expensesService.deleteExpense(expenseId)
                .subscribe(callback => {
                    this.refreshExpensesList();
                    this.expensesService.getUsersExpensesList();
                    alert('Wydatek usunięty');
                });
             });
        });
    }

    addNewBill() {
        let paidSum = 0;
        let debtSum = 0;
        let expenseId: number;
        if (this.expensesList) {
            expenseId = Number(this.expensesList[this.expensesList.length - 1].id) + 1;
        }else {
            expenseId = 1;
        }
        for (let i = 0; i < this.usersGroupsList.length; i++) {
            if (this.usersGroupsList[i].groupId === this.groupId ) {
                paidSum += Number(this.usersGroupsList[i].paid);
                debtSum += Number(this.usersGroupsList[i].debt);
                this.usersGroupsList[i].balans = this.usersGroupsList[i].paid - this.usersGroupsList[i].debt;
            }
        }
        const newBill = {id: expenseId, name: this.newBillName, amount: this.newBillAmount, groupId: this.groupId, date: new Date()};
        const bilans = paidSum - debtSum;
        if (this.newBillAmount - paidSum === 0 && bilans === 0 && this.newBillName !== '') {
            this.expensesService.insertExpensesList(newBill)
                .subscribe(response => {
                    for (let i = 0; i < this.usersGroupsList.length; i++) {
                        if ((this.usersGroupsList[i].paid != 0 || this.usersGroupsList[i].debt) != 0 &&
                        this.usersGroupsList[i].groupId === this.groupId) {
                            const newShare = {userId: this.usersGroupsList[i].userId, expenseId: expenseId,
                            paidShare: this.usersGroupsList[i].paid, owedShare: this.usersGroupsList[i].debt};
                            this.addNewShare(newShare);                        }
                        if (this.usersGroupsList[i].groupId === this.groupId ) {
                            if (this.usersGroupsList[i].balans < 0) {
                                for (let j = 0; j < this.usersGroupsList.length; j++) {
                                    if (this.usersGroupsList[j].balans > 0) {
                                        if (this.usersGroupsList[j].balans >=  this.usersGroupsList[i].balans * -1 &&
                                            this.usersGroupsList[i].balans < 0) {
                                            const newOwe = {userId: this.usersGroupsList[j].userId,
                                                debtorId: this.usersGroupsList[i].userId,
                                                amount: (this.usersGroupsList[i].balans * -1), expenseId: expenseId};
                                            this.addNewOwe(newOwe);
                                            this.usersGroupsList[j].balans -= this.usersGroupsList[i].balans * -1;
                                            this.usersGroupsList[i].balans = 0;
                                        }else if (this.usersGroupsList[j].balans < this.usersGroupsList[i].balans * -1 &&
                                            this.usersGroupsList[i].balans < 0) {
                                            const newOwe = {userId: this.usersGroupsList[j].userId,
                                                debtorId: this.usersGroupsList[i].userId,
                                                amount: (this.usersGroupsList[j].balans), expenseId: expenseId};
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
                    this.expensesService.getUsersExpensesList();
                });
                alert('Rachunek dodany');
        }else {
            alert('Kwota rachunku nie zgadza się z podanymi kwotami w formularzu, lub bilans tych kwot jest nierowny!');
        }
    }

}
