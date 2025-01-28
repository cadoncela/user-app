import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [
    UserComponent,
    UserFormComponent
  ],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit {

  tittle: string = 'Listado de usuarios';

  users: User[] = [];

  selectedUser: User;

  flagModal: boolean = false;

  constructor(
    private service: UserService){
      this.selectedUser = new User();
    }
  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void{
    this.service.findAll().subscribe( users => this.users = users );
  }

  addUser(user: User): void{

    if (user.id > 0){
      this.users = this.users.map( u => (u.id == user.id) ? { ... user} : u);
    }else {
      //se clona el arreglo de usuarios y se agrega el nuevo usuario
      this.users = [... this.users, { ...user, id: new Date().getTime() }];
    }
    Swal.fire({
      title: "Guardado!",
      text: "Usuario guardado correctamente!",
      icon: "success"
    });
    this.selectedUser = new User();
    this.setFlagModal();
  }

  removeUser(id: number): void{
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
        Swal.fire({
          title: "Eliminado!",
          text: "Usuario eliminado.",
          icon: "success"
        });
      }
    });

  }

  setSelectedUser(user: User): void{
    this.selectedUser = {... user};
    this.flagModal = true;
  }

  setFlagModal(): void{
    this.flagModal = !this.flagModal;
  }

}
