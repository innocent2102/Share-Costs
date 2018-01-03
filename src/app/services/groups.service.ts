
import { Injectable } from '@angular/core';
import { Igroup } from '../groups/igroup';
import { Iusergroup } from '../groups/iusergroup';
import { Observable } from 'rxjs/observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GroupsService {

    constructor(private _http: Http) { }

    getGroupsList(): Observable<Igroup> {
       return this._http
            .get('http://gorlewskim.pl/share-costs-api/groups/read.php')
            .map(res => res.json());
    }

    getUsersGroupsList(): Observable<any> {
      return this._http.get('http://gorlewskim.pl/share-costs-api/usersgroups/read.php')
        .map(res => res.json());
    }

    private handleError(error: Response) {
        console.error(error);
        const message = 'Error status code ${error.status} at ${error.url}';
        return Observable.throw(message);
    }

    insertToGroupList(newGroup: Igroup): Observable<Igroup> {

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this._http.post(
            'http://gorlewskim.pl/share-costs-api/groups/create.php',
            newGroup,
            options
        ).map(res => res.json() as Igroup);
    }

    insertToUsersGroupsList(newUserGroup: Iusergroup): Observable<Iusergroup> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ headers: headers });

      return this._http.post('http://gorlewskim.pl/share-costs-api/usersgroups/create.php',
        newUserGroup
      ).map(res => res.json() as Iusergroup);
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
