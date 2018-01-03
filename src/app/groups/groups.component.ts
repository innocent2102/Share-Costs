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
  usersGroupsList: any;

  constructor(private _activatedRoute: ActivatedRoute,
    private _groupsService: GroupsService,
    private _expensesService: ExpensesService,
    private _router: Router) { }

  ngOnInit() {
    this.refreshExpensesList();
    this.refreshUsersGroupsList();
    this._activatedRoute.params.subscribe(g => this.groupId = g['groupId']);
    console.log(this.usersGroupsList);
  }

  refreshExpensesList() {
    this._expensesService.getExpensesList()
      .subscribe(data => this.expensesList = data['records']);
  }

  refreshUsersGroupsList() {
    this._groupsService.getUsersGroupsList()
      .subscribe(data => this.usersGroupsList = data['records']);
  }




}
