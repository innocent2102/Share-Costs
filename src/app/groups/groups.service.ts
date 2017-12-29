import { Injectable } from '@angular/core';
import { Igroup } from './igroup';
import { Observable } from 'rxjs/observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GroupsService {

    constructor(private _http: Http) { }

    getGroupsList(): Observable<Igroup[]> {
        return this._http
            .get('http://gorlewskim.pl/share-costs-api/groups/read.php')
            .map(res => res.json());
    }

    insertToGroupList(newGroup): Observable<Igroup> {

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        console.log(headers);
        console.log(options);
        console.log(newGroup.name);

        return this._http.post(
            'http://gorlewskim.pl/share-costs-api/groups/create.php',
            {'name' : newGroup.name},
            options
        ).map(res => res.json());
    }

    removeGroup(groupId): Observable<Igroup> {

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this._http.post(
            'http://gorlewskim.pl/share-costs-api/groups/delete.php',
            { id: groupId },
            options
        ).map(res => res.json());
    }



}
