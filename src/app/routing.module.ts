import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { GroupsComponent } from './groups/groups.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
    { path: 'app-root', component: AppComponent },
    { path: 'groups/:groupName/:groupId', component: GroupsComponent },
    { path: 'users/:userId', component: UsersComponent },
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
  ],
  declarations: [
    PageNotFoundComponent,
    GroupsComponent,
    UsersComponent
]
})
export class RoutingModule { }
