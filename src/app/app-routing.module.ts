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

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'cadastro', component: CadastroComponent},

  {path: '', component: NavComponent, canActivate: [AuthGuard], children: [
    {path: 'home', component: HomeComponent },

    {path: 'abrigos', component: AbrigoComponent },
    {path: 'abrigos/cadastro', component: AbrigoCreateComponent, canActivate: [AuthGuard], data: { allowedRoles: ['ADMIN'] } },
    {path: 'abrigos/atualizar/:id', component: AbrigoUpdateComponent, canActivate: [AuthGuard], data: { allowedRoles: ['ADMIN'] } },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
