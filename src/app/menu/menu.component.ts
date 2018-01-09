import { Component, OnInit } from '@angular/core';
import { Iuser } from '../users/shared/iuser';
import { UsersService } from '../users/shared/users.service';
import { Igroup } from '../groups/shared/igroup';
import { GroupsService } from '../groups/shared/groups.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { MinLengthValidator } from '@angular/forms/src/directives/validators';

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

    constructor(private _usersService: UsersService,
        private _groupsService: GroupsService,
        private _formBuilder: FormBuilder) { }

    ngOnInit() {
        this.refreshUsersList();
        this.refreshGroupsList();
    }

    refreshUsersList() {
        this._usersService.getUsersList()
        .subscribe(users =>
            this.usersList = users['records'],
            error => this.errorMessage = <any>error
        );
        this.newUserForm = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
        });
    }

    refreshGroupsList() {
        this._groupsService.getGroupsList()
        .subscribe(groups =>
            this.groupsList = groups['records'],
            error => this.errorMessage = <any>error
        );
        this.newGroupForm = this._formBuilder.group({
        name: ['', Validators.required]
        });
    }

    addNewGroup() {
        this._groupsService.insertToGroupList(this.newGroupForm.value)
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
        this._usersService.insertToUsersList(this.newUserForm.value)
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
        this._groupsService.removeGroup(groupId)
        .subscribe(
            response => {
            console.log(response);
            this.refreshGroupsList();
            },
            error => console.log(error)
        );
    }

    removeUser(userId) {
        this._usersService.removeUser(userId)
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
