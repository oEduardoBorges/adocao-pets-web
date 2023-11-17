import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { CredenciaisCadastro } from '../../models/credenciaisCadastro';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {


  credenciaisCadastro: CredenciaisCadastro = {
    nome: '',
    email: '',
    senha: ''
  }

  nome = new FormControl(null, Validators.minLength(1));
  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(private toast: ToastrService, private authService: AuthService, private router: Router) {}
  
  registrar() {
    this.authService.register(this.credenciaisCadastro).subscribe(() => {
      this.toast.info('Cadastro concluído!');
      this.router.navigate(['login']);
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

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
  }
}
