import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { Iuser } from '../users/iuser';
import { UsersService } from '../users/users.service';
import { Igroup } from '../groups//igroup';
import { GroupsService } from '../groups/groups.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {

    usersList: Observable <Iuser[]>;
    groupsList: Observable <Igroup>;
    newGroupForm: FormGroup;
    newUserForm: FormGroup;
    errorMessage: string;
    newGroupId: number;

    constructor(private usersService: UsersService,
        private groupsService: GroupsService,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.refreshUsersList();
        this.refreshGroupsList();
    }

    refreshUsersList() {
        this.usersService.getUsersList()
        .subscribe(users =>
            this.usersList = users['records'],
            error => this.errorMessage = <any>error
        );
        this.newUserForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
        });
    }

    refreshGroupsList() {
        this.groupsService.getGroupsList()
        .subscribe(groups =>
            this.groupsList = groups['records'],
            error => this.errorMessage = <any>error
        );
        this.newGroupForm = this.formBuilder.group({
        name: ['', Validators.required]
        });
    }

    addNewGroup() {
        this.groupsService.insertToGroupList(this.newGroupForm.value)
        .subscribe(
            response => {
                alert('Grupa dodana!');
                console.log(response);
                this.refreshGroupsList();
                },
            error => console.log(error)
            );
    }

    addNewUser() {
        this.usersService.insertToUsersList(this.newUserForm.value)
        .subscribe(
            response => {
                alert('Użytkownik dodany!');
                console.log(this.newUserForm);
                this.refreshUsersList();
            },
            error => console.log(error)
        );
    }

    removeGroup(groupId) {
        this.groupsService.removeGroup(groupId)
        .subscribe(
            response => {
                console.log(response);
                this.refreshGroupsList();
            },
            error => console.log(error)
        );
    }

    removeUser(userId) {
        this.usersService.removeUser(userId)
        .subscribe(
            response => {
                console.log(response);
                this.refreshUsersList();
            },
            error => console.log(error)
        );
    }

    redirectGroupId(id: number) {
        this.newGroupId = id;
    }

}
