import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Pets } from '../../../../models/pets';
import { FormControl, Validators } from '@angular/forms';
import { AbrigoService } from '../../../../services/abrigo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Abrigo } from '../../../../models/abrigo';

@Component({
  selector: 'app-pets-create',
  templateUrl: './pets-create.component.html',
  styleUrl: './pets-create.component.css'
})
export class PetsCreateComponent implements OnInit {

  abrigo: Abrigo = {
    id:       '',
    nome:     '',
    telefone: '',
    email:    ''
  }

  pets: Pets = {
    tipo:   '',
    nome:   '',
    raca:   '',
    idade:  0,
    cor:    '',
    peso:   0
  }

  tipo: FormControl = new FormControl(null, Validators.required);
  nome: FormControl = new FormControl(null, Validators.required);
  raca: FormControl = new FormControl(null, Validators.required);
  idade: FormControl = new FormControl(null, Validators.required);
  cor: FormControl = new FormControl(null, Validators.required);
  peso: FormControl = new FormControl(null, Validators.required);

  ngOnInit(): void {
    this.abrigo.id = this.route.snapshot.paramMap.get('id');
    this.buscarAbrigoPorId();
  }

  constructor(private abrigoService: AbrigoService, private toast: ToastrService, private router: Router, private route: ActivatedRoute) {}

  buscarAbrigoPorId(): void {
    this.abrigoService.buscarPorId(this.abrigo.id).subscribe(resposta => {
      this.abrigo = resposta;
    })
  }

  cadastrarPets(): void {
    this.abrigoService.cadastrarPets(this.abrigo.id, this.pets).subscribe(resposta => {
      this.toast.success('Pet para abrigo cadastrado com sucesso!', 'Abrigo');
      this.router.navigate([`abrigos/pets/${this.abrigo.id}`]);
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
    return this.tipo.valid && this.nome.valid && this.raca.valid &&
    this.idade.valid && this.cor.valid && this.peso.valid
  }
}
