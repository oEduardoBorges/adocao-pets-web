import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Imports para componentes do Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    HeaderComponent,
    HomeComponent,
    CadastroComponent,
    AbrigoComponent,
    AbrigoUpdateComponent,
    AbrigoCreateComponent,
    PetsListComponent,
    PetsCreateComponent,
    PetListComponent,
    TutorListComponent,
    TutorUpdateComponent,
    TutorCreateComponent,
    AdocoesCreateComponent,
    AdocoesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    })
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
