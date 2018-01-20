import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { OwesComponent } from './owes/owes.component';
import { OwesDetailsComponent } from './owes/owes-details/owes-details.component';
import { ExpensesDetailsComponent } from './expenses/expenses-details/expenses-details.component';

const appRoutes: Routes = [
    { path: 'expenses/:groupName/:groupId', component: ExpensesComponent },
    { path: 'expenses-details/:expenseId/:expenseName/:expenseAmount', component: ExpensesDetailsComponent },
    { path: 'owes/:userName/:userId', component: OwesComponent },
    { path: 'owes-details/:debtorId/:userId/:userName/:debtorName', component: OwesDetailsComponent },
    { path: '', redirectTo: '/groups/2', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
