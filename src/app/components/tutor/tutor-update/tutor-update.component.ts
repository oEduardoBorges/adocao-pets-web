import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Tutor } from '../../../models/tutor';
import { TutorService } from '../../../services/tutor.service';

@Component({
  selector: 'app-tutor-update',
  templateUrl: './tutor-update.component.html',
  styleUrl: './tutor-update.component.css'
})
export class TutorUpdateComponent {

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
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.tutor.id = this.route.snapshot.paramMap.get('id');
    this.buscarPorId();
  }

  buscarPorId(): void {
    this.tutorService.buscarPorId(this.tutor.id).subscribe(resposta => {
      this.tutor = resposta;
    })
  }

  atualizar(): void {
    this.tutorService.atualizar(this.tutor).subscribe(() => {
      this.toast.success('Tutor atualizado com sucesso!', 'Tutores');
      this.router.navigate(['tutores']);
    }, ex => {
      this.toast.error('Erro inesperado');
    })
  }

  validarCampos(): boolean {
    return this.nome.valid && this.telefone.valid && this.email.valid
  }
}

