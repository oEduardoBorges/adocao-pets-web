import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Credenciais } from './../models/credenciais';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CredenciaisCadastro } from '../models/credenciaisCadastro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  authenticate(credenciais: Credenciais) {
    return this.http.post(`${environment.apiUrl}/login/logar`, credenciais, {
      observe: 'response',
      responseType: 'text'
    })
  }

  register(credenciaisCadastro: CredenciaisCadastro): Observable<CredenciaisCadastro> {
    return this.http.post<CredenciaisCadastro>(`${environment.apiUrl}/login/registro`, credenciaisCadastro);
  }

  sucessfullLogin(authToken: string) {
    localStorage.setItem('token', authToken);
  }

  isAuthenticated() {
    let token = localStorage.getItem('token');
    if(token != null) {
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }

  logout() {
    localStorage.clear();
  }
}
