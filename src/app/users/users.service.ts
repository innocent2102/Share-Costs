import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Iuser } from './iuser';

@Injectable()
export class UsersService {

  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  constructor(private _http: Http) { }

    getUsersList(): Observable<Iuser> {
        return this._http
            .get('http://gorlewskim.pl/share-costs-api/users/read.php')
            .map(res => res.json() as Iuser);
    }

    insertToUsersList(newUser): Observable<Iuser> {
        return this._http
            .post('http://gorlewskim.pl/share-costs-api/users/create.php',
            newUser,
            this.options
        ).map(res => res.json() as Iuser);
    }

    removeUser(userId): Observable<Iuser> {
        return this._http.post(
            'http://gorlewskim.pl/share-costs-api/users/delete.php',
            { id: userId },
            this.options
        ).map(res => res.json() as Iuser);
    }


}
