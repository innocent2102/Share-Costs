import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ExpensesComponent } from './expenses/expenses.component';

const appRoutes: Routes = [
    { path: 'app-root', component: AppComponent },
    { path: 'expenses/:groupName/:groupId', component: ExpensesComponent },
    { path: 'users/:userName/:userId', component: UsersComponent },
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
    UsersComponent,
    ExpensesComponent,
]
})
export class AppRoutingModule { }
