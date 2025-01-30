import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private  _newUserEmitter: EventEmitter<User> = new EventEmitter();
  private  _idUserEmitter: EventEmitter<number> = new EventEmitter();

  constructor() { }

  get newUserEmitter(){
    return this._newUserEmitter;
  }

  get idUserEmitter(){
    return this._idUserEmitter;
  }
}
