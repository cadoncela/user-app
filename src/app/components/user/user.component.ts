import { Component, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { state } from '@angular/animations';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html'
})
export class UserComponent {

  users: User[] = [];

  constructor(
    private sharingData: SharingDataService,
    private service: UserService,
    private router: Router
  ){
      if (this.router.getCurrentNavigation()?.extras.state){
        this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
      } else {
        this.service.findAll().subscribe( users => this.users = users );
      }

  }

  onRemoveUser(id: number): void{
    this.sharingData.idUserEmitter.emit(id);
  }

  onSelectUser(user: User): void{
    this.router.navigate(['/users/edit', user.id], {state: {user}});
  }

}
