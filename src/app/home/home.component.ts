import {Component, OnInit, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpErrorResponse} from '@angular/common/http';
import {AppService} from '../app.service';
import {Item} from '../Item';
import {Observable} from 'rxjs';
import {DataService} from '../brokerService';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: Observable<Item[]>;
  total: number = 0;
  length: number = 0;
  public chosenItems: Item[] = [];


  constructor(private httpService: HttpClient, private appService: AppService, public dataService: DataService) {
    this.appService.getJSON().subscribe(data => {
      this.length++;
      this.items = data;
      this.length = data.length;
      console.log(data);
    });
  }


  ngOnInit() {
    this.totalPrice();

  }

  totalPrice() {
    this.total = 0;
    for (let i = 0; i < this.length; i++) {
      this.total += (this.items[i].price * this.items[i].quantity);
    }
    console.log(this.total);
  }


  add(pid) {
    console.log(pid);
    console.log(this.length);
    for (var i = 0; i < this.length; i++) {
      console.log(this.items[i].ID);
      if (this.items[i].ID === pid) {
        if (this.items[i].quantity < 3) {
          this.items[i].quantity += 1;
          console.log(this.items[i]);
          console.log(this.chosenItems);
        }
      }
    }
    this.checkIfOnTheList();
    this.totalPrice();
    console.log(this.items);
    console.log(this.chosenItems);
  }

  del(pid) {
    console.log(pid);
    for (let i = 0; i < this.length; i++) {
      if (this.items[i].ID === pid) {
        this.items[i].quantity -= 1;
      }
    }
    this.checkIfOnTheList();
    this.totalPrice();
    console.log(this.items);
    console.log(this.chosenItems);
  }

  private checkIfOnTheList() {
    this.chosenItems = [];
    for (let j = 0; j < this.length; j++) {
      if (this.items[j].quantity > 0) {
        this.chosenItems.push(this.items[j]);
      }
    }
    this.dataService.serviceData = this.chosenItems;
  }
}
