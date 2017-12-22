import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { RoutingModule } from './/routing.module';
import { UsersService } from './users/users.service';
import { HttpModule } from '@angular/http';
import { GroupsComponent } from './groups/groups.component';
import { GroupsService } from './groups/groups.service';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    GroupsComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpModule
  ],
  providers: [UsersService, GroupsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
