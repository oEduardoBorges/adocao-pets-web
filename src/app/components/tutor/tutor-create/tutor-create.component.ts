import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Tutor } from '../../../models/tutor';
import { TutorService } from '../../../services/tutor.service';

@Component({
  selector: 'app-tutor-create',
  templateUrl: './tutor-create.component.html',
  styleUrl: './tutor-create.component.css'
})
export class TutorCreateComponent {

  tutor: Tutor = {
    id:       '',
    nome:     '',
    telefone: '',
    email:    ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(1));
  telefone: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);

  constructor(
    private tutorService: TutorService,
    private toast: ToastrService,
    private router: Router
  ) {}

  cadastrar(): void {
    this.tutorService.cadastrar(this.tutor).subscribe(() => {
      this.toast.success('Abrigo cadastrado com sucesso!', 'Abrigo');
      this.router.navigate(['tutores']);
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }

  validarCampos(): boolean {
    return this.nome.valid && this.telefone.valid && this.email.valid
  }
}

