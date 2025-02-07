import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  //La pagina user-app.component.html envia el valor de los users y se recibe en la siguiente variable.
  @Input() users: User[] = [];
}
