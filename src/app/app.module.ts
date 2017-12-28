import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './/routing.module';
import { UsersService } from './users/users.service';
import { HttpModule } from '@angular/http';
import { GroupsService } from './groups/groups.service';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';

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
    ReactiveFormsModule
  ],
  providers: [UsersService, GroupsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
