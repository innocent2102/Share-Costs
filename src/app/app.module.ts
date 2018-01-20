import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { OwesComponent } from './owes/owes.component';
import { OwesDetailsComponent } from './owes/owes-details/owes-details.component';
import { ExpensesDetailsComponent } from './expenses/expenses-details/expenses-details.component';
import { OwesService } from './owes/shared/owes.service';
import { UsersService } from './users/users.service';
import { GroupsService } from './groups/groups.service';
import { ExpensesService } from './expenses/shared/expenses.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PageNotFoundComponent,
    OwesComponent,
    ExpensesComponent,
    OwesDetailsComponent,
    ExpensesDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ExpensesService, GroupsService, UsersService, OwesService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
