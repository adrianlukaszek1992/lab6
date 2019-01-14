import { Injectable } from '@angular/core';
import {Item} from './Item';

@Injectable()
export class DataService {
  serviceData: Item[];
}
