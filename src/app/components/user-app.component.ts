import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit {

  tittle: string = 'Listado de usuarios';

  users: User[] = [];

  constructor(
    private router: Router,
    private service: UserService,
    private sharingService: SharingDataService){
    }
  ngOnInit(): void {
    this.findAll();

    //se suscribe a los metodos, no se están ejecutando.
    this.addUser();
    this.removeUser();
  }

  findAll(): void{
    this.service.findAll().subscribe( users => this.users = users );
  }

  addUser(): void{
    this.sharingService.newUserEmitter.subscribe( user => {
      if (user.id > 0){
            this.users = this.users.map( u => (u.id == user.id) ? { ... user} : u);
          }else {
            //se clona el arreglo de usuarios y se agrega el nuevo usuario
            this.users = [... this.users, { ...user, id: new Date().getTime() }];
          }

          //Se hace el redirect hacia el listado de usuarios
          this.router.navigate(['/users'], { state: { users: this.users } });

          Swal.fire({
            title: "Guardado!",
            text: "Usuario guardado correctamente!",
            icon: "success"
          });
    });
  }

  removeUser(): void{
    this.sharingService.idUserEmitter.subscribe( id => {
        Swal.fire({
        title: "Está seguro?",
        text: "Eso no se puede revertir!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.users = this.users.filter(user => user.id != id);

          // Se hace un redireccionamiento hacia una pagina distinta
          // y luego(then) se regresa a la pagina principal para que quede refrescada la pagina
          this.router.navigate(['/users/create'], { skipLocationChange: true}).then(() => {
            this.router.navigate(['/users'], { state: { users: this.users } })
          });
          Swal.fire({
            title: "Eliminado!",
            text: "Usuario eliminado.",
            icon: "success"
          });
        }
      });
    });

  }
}
