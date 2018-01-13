import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { OwesComponent } from './owes/owes.component';
import { OwesDetailsComponent } from './owes/owes-details/owes-details.component';

const appRoutes: Routes = [
    { path: 'app-root', component: AppComponent },
    { path: 'expenses/:groupName/:groupId', component: ExpensesComponent },
    { path: 'owes/:userName/:userId', component: OwesComponent },
    { path: 'owes-details/:debtorId/:userId', component: OwesDetailsComponent },
    { path: '', redirectTo: '/groups/2', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    PageNotFoundComponent,
    OwesComponent,
    ExpensesComponent,
    OwesDetailsComponent
]
})
export class AppRoutingModule { }
