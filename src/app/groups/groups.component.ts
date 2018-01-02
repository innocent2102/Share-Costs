import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../services/groups.service';
import { ExpensesService } from '../services/expenses.service';
import { Iexpenses } from '../groups/iexpenses';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styles: []
})
export class GroupsComponent implements OnInit {

  expensesList: Iexpenses;
  groupId: number;

  constructor(private _activatedRoute: ActivatedRoute,
    private _expensesService: ExpensesService,
    private _router: Router) { }

  ngOnInit() {
    this.refreshExpensesList();
    this._activatedRoute.params.subscribe(g => this.groupId = g['groupId']);
  }

  refreshExpensesList() {
    this._expensesService.getExpensesList()
      .subscribe(data => this.expensesList = data['records']);
  }




}
