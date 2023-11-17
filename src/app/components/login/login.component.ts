import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from '../../models/credenciais';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credenciais: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(private toast: ToastrService, private authService: AuthService, private router: Router) {}
  
  logar() {
    this.authService.authenticate(this.credenciais).subscribe(
      resposta => {
        try {
          const responseObject = JSON.parse(resposta.body);
          const token = responseObject?.token;

          if (token) {
            this.authService.sucessfullLogin(token);
            this.router.navigate(['']);
          } else {
            this.toast.error('Token não encontrado na resposta do servidor.');
          }
        } catch (error) {
          this.toast.error('Erro ao analisar a resposta do servidor.');
        }
      }, () => {
        this.toast.error('Usuário e/ou senha inválidos');
      }
    );
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
  }
}
