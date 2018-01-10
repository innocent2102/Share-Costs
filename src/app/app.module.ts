import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { ExpensesService } from './expenses/shared/expenses.service';
import { OwesService } from './owes/owes.service';
import { UsersService } from './users/shared/users.service';
import { GroupsService } from './groups/groups.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
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
