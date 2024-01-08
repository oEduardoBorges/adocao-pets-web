import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AdocaoService } from '../../../services/adocao.service';
import { Adocao } from '../../../models/adocao';


@Component({
  selector: 'app-adocoes-aprovar',
  templateUrl: './adocoes-aprovar.component.html',
  styleUrl: './adocoes-aprovar.component.css'
})
export class AdocoesAprovarComponent {

  adocao: Adocao = {
    idAdocao:   '',
    idPet:      '',
    idTutor:    '',
    motivo:     '',
    status:     ''
  }

  idAdocao: FormControl = new FormControl(null, Validators.required);

  constructor(
    private adocaoService: AdocaoService,
    private toast: ToastrService,
    private router: Router
  ) {}

aprovar(): void {
  this.adocaoService.aprovar(this.adocao).subscribe(() => {
    this.toast.success('Adoção aprovada com sucesso!', 'Adoção');
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
    return this.idAdocao.valid 
  }
}
