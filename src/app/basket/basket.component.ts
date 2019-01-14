import {Component, OnInit} from '@angular/core';
import {Item} from '../Item';

import {Observable} from 'rxjs';
import {DataService} from '../brokerService';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
 
  items: Item[];
  
  constructor(public dataService: DataService) {

  }

  ngOnInit() {
    this.items = this.dataService.serviceData;
    console.log(this.items);
  }

}
