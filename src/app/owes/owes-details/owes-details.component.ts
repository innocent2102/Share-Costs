import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Iowes} from '../shared/iowes';
import { OwesService } from '../shared/owes.service';

@Component({
  selector: 'app-owes-details',
  templateUrl: './owes-details.component.html',
  styles: []
})
export class OwesDetailsComponent implements OnInit {

    debtorId: number;
    userId: number;
    owesList: Iowes[];

    constructor(private activatedRoute: ActivatedRoute,
                private owesListService: OwesService) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(g => this.userId = g['userId']);
        this.activatedRoute.params.subscribe(g => this.debtorId = g['debtorId']);
        this.refreshOwesList();
    }

    refreshOwesList() {
        this.owesListService.getOwesList()
          .subscribe(data => this.owesList = data['records']);
      }

}
