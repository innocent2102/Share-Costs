import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingModule } from './/routing.module';
import { UsersService } from './users/users.service';
import { HttpModule } from '@angular/http';
import { GroupsService } from './groups/groups.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
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
