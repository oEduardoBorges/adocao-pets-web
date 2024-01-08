import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { AbrigoComponent } from './components/abrigo/abrigo-list/abrigo.component';
import { AbrigoUpdateComponent } from './components/abrigo/abrigo-update/abrigo-update.component';
import { AbrigoCreateComponent } from './components/abrigo/abrigo-create/abrigo-create.component';
import { PetsListComponent } from './components/abrigo/pets/pets-list/pets-list.component';
import { PetsCreateComponent } from './components/abrigo/pets/pets-create/pets-create.component';
import { PetListComponent } from './components/pet/pets-list/pets-list.component';
import { TutorListComponent } from './components/tutor/tutor-list/tutor-list.component';
import { TutorUpdateComponent } from './components/tutor/tutor-update/tutor-update.component';
import { TutorCreateComponent } from './components/tutor/tutor-create/tutor-create.component';
import { AdocoesCreateComponent } from './components/adocoes/adocoes-create/adocoes-create.component';
import { AdocoesListComponent } from './components/adocoes/adocoes-list/adocoes-list.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'cadastro', component: CadastroComponent},

  {path: '', component: NavComponent, canActivate: [AuthGuard], children: [
    {path: 'home', component: HomeComponent },

    {path: 'abrigos', component: AbrigoComponent },
    {path: 'abrigos/pets', component: PetListComponent},
    {path: 'abrigos/cadastro', component: AbrigoCreateComponent, canActivate: [AuthGuard], data: { allowedRoles: ['ADMIN'] } },
    {path: 'abrigos/atualizar/:id', component: AbrigoUpdateComponent, canActivate: [AuthGuard], data: { allowedRoles: ['ADMIN'] } },
    {path: 'abrigos/pets/:id', component: PetsListComponent},
    {path: 'abrigos/pets/:id/cadastro', component: PetsCreateComponent},

    {path: 'tutores', component: TutorListComponent},
    {path: 'tutores/cadastro', component: TutorCreateComponent, canActivate: [AuthGuard], data: { allowedRoles: ['ADMIN'] } },
    {path: 'tutores/atualizar/:id', component: TutorUpdateComponent, canActivate: [AuthGuard], data: { allowedRoles: ['ADMIN'] } },

    {path: 'adocoes', component: AdocoesListComponent},
    {path: 'adocoes/cadastro', component: AdocoesCreateComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
