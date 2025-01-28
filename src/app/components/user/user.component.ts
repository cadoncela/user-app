import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html'
})
export class UserComponent {

  @Input() users: User[] = [];

  @Output() idUserEmitter: EventEmitter<number> = new EventEmitter();
  @Output() selectedUserEmitter: EventEmitter<User> = new EventEmitter();

  onRemoveUser(id: number): void{
    this.idUserEmitter.emit(id);
  }

  onSelectUser(user: User): void{
    this.selectedUserEmitter.emit(user);
  }

}
