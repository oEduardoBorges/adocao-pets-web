import { Component } from '@angular/core';
import { Abrigo } from '../../../models/abrigo';
import { FormControl, Validators } from '@angular/forms';
import { AbrigoService } from '../../../services/abrigo.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-abrigo-create',
  templateUrl: './abrigo-create.component.html',
  styleUrl: './abrigo-create.component.css'
})
export class AbrigoCreateComponent {
  
  abrigo: Abrigo = {
    id:       '',
    nome:     '',
    telefone: '',
    email:    ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(1));
  telefone: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);

  constructor(
    private abrigoService: AbrigoService,
    private toast: ToastrService,
    private router: Router
  ) {}

  cadastrar(): void {
    this.abrigoService.cadastrar(this.abrigo).subscribe(() => {
      this.toast.success('Abrigo cadastrado com sucesso!', 'Abrigo');
      this.router.navigate(['abrigos']);
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
