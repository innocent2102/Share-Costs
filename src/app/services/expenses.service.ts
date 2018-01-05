import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Iexpenses } from '../groups/iexpenses';
import { Observable } from 'rxjs/observable';

@Injectable()
export class ExpensesService {

  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  constructor(private _http: Http) { }

  getExpensesList(): Observable<Iexpenses> {
    return this._http.get('http://gorlewskim.pl/share-costs-api/expenses/read.php')
      .map(res => res.json());
  }

  insertExpensesList(newBill): Observable<Iexpenses> {
    return this._http.post('http://gorlewskim.pl/share-costs-api/expenses/create.php',
      newBill,
      this.options
    ).map(res => res.json() as Iexpenses);
  }

}
