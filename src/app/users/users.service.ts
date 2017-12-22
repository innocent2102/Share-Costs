import { Injectable } from '@angular/core';
import { Iuser } from './iuser';
import { Observable } from 'rxjs/observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UsersService {

  constructor(private _http: Http) { }

    getUsersList(): Observable<Iuser[]> {
        return this._http
            .get('http://gorlewskim.pl/share-costs-api/users/read.php')
            .map(res => res.json());
    }

}
