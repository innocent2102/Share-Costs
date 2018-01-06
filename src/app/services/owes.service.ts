import { Injectable } from '@angular/core';
import { Iowes} from '../users/iowes';
import { Observable } from 'rxjs/observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OwesService {

  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  constructor(private _http: Http) { }

  getOwesList(): Observable<Iowes[]> {
    return this._http
        .get('http://gorlewskim.pl/share-costs-api/owes/read.php')
        .map(res => res.json());
  }

  insertOweToList(newOwe): Observable<Iowes> {
    return this._http.post('http://gorlewskim.pl/share-costs-api/owes/create.php',
      newOwe,
      this.options
    ).map(res => res.json() as Iowes);
  }


}
