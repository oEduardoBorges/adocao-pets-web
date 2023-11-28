import { Component, OnInit } from '@angular/core';
import { Abrigo } from '../../../models/abrigo';
import { AbrigoService } from '../../../services/abrigo.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-abrigo-update',
  templateUrl: './abrigo-update.component.html',
  styleUrl: './abrigo-update.component.css'
})
export class AbrigoUpdateComponent implements OnInit {

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
    private abrigoSerive: AbrigoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.abrigo.id = this.route.snapshot.paramMap.get('id');
    this.buscarPorId();
  }

  buscarPorId(): void {
    this.abrigoSerive.buscarPorId(this.abrigo.id).subscribe(resposta => {
      this.abrigo = resposta;
    })
  }

  atualizar(): void {
    this.abrigoSerive.atualizar(this.abrigo).subscribe(() => {
      this.toast.success('Abrigo atualizado com sucesso!', 'Abrigo');
      this.router.navigate(['abrigos']);
    }, ex => {
      this.toast.error('Erro inesperado');
    })
  }

  validarCampos(): boolean {
    return this.nome.valid && this.telefone.valid && this.email.valid
  }
}
