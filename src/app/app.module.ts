import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './/routing.module';
import { UsersService } from './services/users.service';
import { HttpModule } from '@angular/http';
import { GroupsService } from './services/groups.service';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ExpensesService } from './services/expenses.service';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ExpensesService, GroupsService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
