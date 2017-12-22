import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Iuser } from './users/iuser';
import { UsersService } from './users/users.service';
import { Igroup } from './groups/igroup';
import { GroupsService } from './groups/groups.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {

    usersList: Iuser[];
    groupsList: Igroup[];

    newGroupForm: FormGroup;

    constructor(private _usersService: UsersService,
        private _groupsService: GroupsService,
        private _formBuilder: FormBuilder) {
            this.newGroupForm = _formBuilder.group({
                name: ['', Validators.required]
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
                 product => {
                    console.log(product);
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
