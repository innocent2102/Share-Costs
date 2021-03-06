import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Igroup } from './igroup';
import { Iusergroup } from '../users/iusergroup';

@Injectable()
export class GroupsService {

    headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });

    constructor(private _http: Http) { }

    getGroupsList(): Observable<Igroup> {
        return this._http
        .get('http://gorlewskim.pl/share-costs-api/groups/read.php')
        .map(res => res.json());
    }

    getUsersGroupsList(): Observable<Iusergroup> {
        return this._http.get('http://gorlewskim.pl/share-costs-api/usersgroups/read.php')
        .map(res => res.json());
    }

    insertToGroupList(newGroup: Igroup): Observable<Igroup> {
        return this._http.post('http://gorlewskim.pl/share-costs-api/groups/create.php',
        newGroup,
        this.options
        ).map(res => res.json() as Igroup);
    }

    insertToUsersGroupsList(newUserGroup: Iusergroup): Observable<Iusergroup> {
        return this._http.post('http://gorlewskim.pl/share-costs-api/usersgroups/create.php',
        newUserGroup,
        this.options
        ).map(res => res.json() as Iusergroup);
    }

    removeGroup(groupId): Observable<Igroup> {
        return this._http.post('http://gorlewskim.pl/share-costs-api/groups/delete.php',
        { id: groupId },
        this.options
        ).map(res => res.json());
    }

    removeUserGroup(groupId, userId): Observable<Iusergroup> {
        return this._http.post('http://gorlewskim.pl/share-costs-api/usersgroups/delete.php',
        {groupId: groupId, userId: userId},
        this.options
        ).map(res => res.json());
    }



}
