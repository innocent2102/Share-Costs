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

    insertToUsersList(newUser): Observable<Iuser> {

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this._http
            .post('http://gorlewskim.pl/share-costs-api/users/create.php',
            newUser,
            options
        ).map(res => res.json());
    }

    removeUser(userId) {

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this._http.post(
            'http://gorlewskim.pl/share-costs-api/users/delete.php',
            { id: userId },
            options
        ).map(res => res.json());
    }


}
