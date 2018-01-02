
import { Injectable } from '@angular/core';
import { Igroup } from './igroup';
import { Observable } from 'rxjs/observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';


@Injectable()
export class GroupsService {

    constructor(private _http: Http) { }

    // private subject: Subject<any> = new ReplaySubject<any>(1);
    // get $getSubject(): Observable<any> {
    //     return this.subject.asObservable();
    // }

    getGroupsList() {
       return this._http
            .get('http://gorlewskim.pl/share-costs-api/groups/read.php')
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
