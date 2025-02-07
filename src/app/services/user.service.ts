import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = 'http://localhost:8081/users/v1/api';

  private users: User[] = [];

  constructor(private http: HttpClient) { }

  findAll(): Observable<User[]>{
    //llamando al api backend - Dos maneras de hacer lo mismo
    //return this.http.get(this.url).pipe(map(data => data as User[]));
    return this.http.get<User[]>(this.url);
  }

  findById(id: number): Observable<User>{
    //llamando al api backend - Dos maneras de hacer lo mismo
    //return this.http.get<User>(this.url+'/'+id);
    return this.http.get<User>(`${this.url}/${id}`);
  }

  create(user: User): Observable<User>{
    return this.http.post<User>(this.url, user);
  }

  update(user: User): Observable<User>{
    return this.http.put<User>(`${this.url}/${user.id}`, user);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
