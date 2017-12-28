import { Component, OnInit } from '@angular/core';
import { Iuser } from '../users/iuser';
import { UsersService } from '../users/users.service';
import { Igroup } from '../groups/igroup';
import { GroupsService } from '../groups/groups.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})
export class MenuComponent implements OnInit {

    usersList: Iuser[];
    groupsList: Igroup[];

    newGroupForm: FormGroup;
    newUserForm: FormGroup;

    constructor(private _usersService: UsersService,
        private _groupsService: GroupsService,
        private _formBuilder: FormBuilder) {
            this.newGroupForm = _formBuilder.group({
                name: ['', Validators.required]
            });
            this.newUserForm = _formBuilder.group({
                name: ['', Validators.required],
                email: ['', Validators.required],
            });
    }

    addNewGroup() {
        this._groupsService.insertToGroupList(this.newGroupForm.value)
            .subscribe(
                group => {
                    alert('Grupa dodana!');
                    console.log(this.newGroupForm);
                },
                error => console.log(error)
            );
    }

    removeGroup(groupId) {
        this._groupsService.removeGroup(groupId)
            .subscribe(
                 user => {
                    console.log(user);
                 },
                 error => console.log(error)
             );
    }
    addNewUser() {
        this._usersService.insertToUsersList(this.newUserForm.value)
            .subscribe(
                group => {
                    alert('Użytkownik dodany!');
                    console.log(this.newUserForm);
                },
                error => console.log(error)
            );
    }

    removeUser(userId) {
        this._usersService.removeUser(userId)
            .subscribe(
                 user => {
                    console.log(user);
                 },
                 error => console.log(error)
             );
    }






  ngOnInit() {
        this._usersService.getUsersList()
        .subscribe(users =>
            this.usersList = users['records']
        );
        this._groupsService.getGroupsList()
        .subscribe(groups =>
            this.groupsList = groups['records']
        );

     }

}
