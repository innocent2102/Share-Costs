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

}
