import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

  user: User;

  constructor(
    private route: ActivatedRoute,
    private sharingData: SharingDataService,
    private service: UserService) {
      this.user = new User();
  }
  ngOnInit(): void {
    //Los subscribe van antes de los Emitters

    //Se captura el user que encontró en la clase user-app.component en el método findUserById()
    //Manera de hacelo sin consultar con el backend
    //this.sharingData.selectUserEmitter.subscribe( u => this.user = u);

    //escucha los parametros de la ruta... si el id es mayor a cero entonces lo emite al otro componente para obtener el user
    this.route.paramMap.subscribe( params => {
      const id: number = +(params.get('id') || '0');
      if(id > 0){
        //Manera de hacelo sin consultar con el backend
        //this.sharingData.findUserEmitter.emit(id);

        this.service.findById(id).subscribe( u => this.user = u);
      }
    } );
  }

  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      this.sharingData.newUserEmitter.emit(this.user);
      console.log(this.user);
    }
    userForm.reset();
    userForm.resetForm();
  }
  onClear(userForm: NgForm): void {
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }

}
