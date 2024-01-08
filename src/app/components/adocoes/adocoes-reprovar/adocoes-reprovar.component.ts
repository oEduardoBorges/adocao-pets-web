import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AdocaoService } from '../../../services/adocao.service';
import { Adocao } from '../../../models/adocao';

@Component({
  selector: 'app-adocoes-reprovar',
  templateUrl: './adocoes-reprovar.component.html',
  styleUrl: './adocoes-reprovar.component.css'
})
export class AdocoesReprovarComponent {

  adocao: Adocao = {
    idAdocao:      '',
    idPet:         '',
    idTutor:       '',
    motivo:        '',
    status:        '',
    justificativa: ''
  }

  idAdocao: FormControl = new FormControl(null, Validators.required);
  justificativa: FormControl = new FormControl(null, Validators.required);

  constructor(
    private adocaoService: AdocaoService,
    private toast: ToastrService,
    private router: Router
  ) {}

reprovar(): void {
  this.adocaoService.reprovar(this.adocao).subscribe(() => {
    this.toast.success('Adoção reprovada com sucesso!', 'Adoção');
    this.router.navigate(['adocoes']);
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
    return this.idAdocao.valid && this.justificativa.valid
  }
}
