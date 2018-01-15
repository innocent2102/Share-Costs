import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ExpensesService } from '../shared/expenses.service';
import { IuserExpense } from '../shared/iuser-expense';
import { Iuser } from '../../users/iuser';

@Component({
  selector: 'app-expenses-details',
  templateUrl: './expenses-details.component.html',
  styles: []
})
export class ExpensesDetailsComponent implements OnInit {

    userExpense: IuserExpense[];
    expenseId: number;
    expenseName: string;
    expenseAmount: number;

  constructor(private expensesService: ExpensesService,
            private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
      this.getUsersExpensesList();
      this.activatedRoute.params.subscribe(e => this.expenseId = e['expenseId']);
      this.activatedRoute.params.subscribe(e => this.expenseName = e['expenseName']);
      this.activatedRoute.params.subscribe(e => this.expenseAmount = e['expenseAmount']);
  }

  getUsersExpensesList() {
      this.expensesService.getUsersExpensesList()
        .subscribe( response => {
            this.userExpense = response['records'];
        });
  }

}
