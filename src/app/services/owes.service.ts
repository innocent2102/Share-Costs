import { Injectable } from '@angular/core';
import { Iowes} from '../users/iowes';
import { Observable } from 'rxjs/observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OwesService {

  constructor(private _http: Http) { }

  getOwesList(): Observable<Iowes[]> {
    return this._http
        .get('http://gorlewskim.pl/share-costs-api/owes/read.php')
        .map(res => res.json());
  }


}
