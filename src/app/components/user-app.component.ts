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
    this.findUserById();
  }

  findAll(): void{
    this.service.findAll().subscribe( users => this.users = users );
  }

  findUserById(){
    this.sharingService.findUserEmitter.subscribe( id => {
      const user = this.users.find(user => user.id == id);
      this.sharingService.selectUserEmitter.emit(user);
    });
  }

  addUser(): void{
    this.sharingService.newUserEmitter.subscribe( user => {
      if (user.id > 0){
        //se hace la actualizacion y se actualiza la lista de usuarios con el usuario actualizado.
        this.service.update(user).subscribe( userUpdated => {
          this.users = this.users.map( u => (u.id == userUpdated.id) ? { ... userUpdated} : u);

          //Se hace el redirect hacia el listado de usuarios. Se le pasa al atributo state los usuarios actualizados
          this.router.navigate(['/users'], { state: { users: this.users }});
        });
      }else {
        this.service.create(user).subscribe( userNew => {
        //se clona el arreglo de usuarios y se agrega el usuario creado
        //this.users = [... this.users, { ...userNew }];
        this.service.findAll().subscribe( users => this.users = users );
        console.log('users: ' + this.users.length);
        });
        //Se hace el redirect hacia el listado de usuarios. Se le pasa al atributo state los usuarios actualizados
        this.router.navigate(['/users']);
      }
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
          this.service.delete(id).subscribe ( () => {
            this.users = this.users.filter(user => user.id != id);
            // Se hace un redireccionamiento hacia una pagina distinta
            // y luego(then) se regresa a la pagina principal para que quede refrescada la pagina
            this.router.navigate(['/users/create'], { skipLocationChange: true}).then(() => {
              //Se hace el redirect hacia el listado de usuarios. Se le pasa al atributo state los usuarios actualizados
              this.router.navigate(['/users'], { state: { users: this.users }});
            });
          });
          Swal.fire({
                title: "Eliminado!",
                text: "Usuario eliminado.",
                icon: "success"
          });
        };
      });
    });
  }
}
