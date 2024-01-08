import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AdocaoService } from '../../../services/adocao.service';
import { Adocao } from '../../../models/adocao';

@Component({
  selector: 'app-adocoes-create',
  templateUrl: './adocoes-create.component.html',
  styleUrl: './adocoes-create.component.css'
})
export class AdocoesCreateComponent {

  adocao: Adocao = {
    idAdocao:   '',
    idPet:      '',
    idTutor:    '',
    motivo:     '',
    status:     ''
  }

  idPet: FormControl = new FormControl(null, Validators.required);
  idTutor: FormControl = new FormControl(null, Validators.required);
  motivo: FormControl = new FormControl(null, Validators.required);

  constructor(
    private adocaoService: AdocaoService,
    private toast: ToastrService,
    private router: Router
  ) {}

  cadastrar(): void {
    this.adocaoService.cadastrar(this.adocao).subscribe(() => {
      this.router.navigate(['adocoes']);
    }, ex => {
      this.router.navigate(['adocoes']);
    })
  }
  

  validarCampos(): boolean {
    return this.idPet.valid && this.idTutor.valid && this.motivo.valid
  }
}

