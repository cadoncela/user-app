import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    {
      id: 1,
      name: 'Darkon',
      lastname: 'Doncel',
      email: 'darkon@example.com',
      username: 'darkon',
      password: 'password123'
    },
    {
      id: 2,
      name: 'Oliver',
      lastname: 'Doncel',
      email: 'oliver@example.com',
      username: 'oliver',
      password: 'password123'
    },
    {
      id: 3,
      name: 'Ragnar',
      lastname: 'Doncel',
      email: 'ragnar@example.com',
      username: 'ragnar',
      password: 'password123'
      }
  ];

  constructor() { }

  findAll(): Observable<User[]>{
    return of(this.users);
  }
}
