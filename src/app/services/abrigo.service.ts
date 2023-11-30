import { environment } from './../../environments/environment';
import { Page } from './../models/page';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Abrigo } from '../models/abrigo';
import { Pets } from '../models/pets';

@Injectable({
  providedIn: 'root'
})
export class AbrigoService {

  constructor(private http: HttpClient) { }

  cadastrar(abrigo: Abrigo): Observable<Abrigo> {
    return this.http.post<Abrigo>(`${environment.apiUrl}/abrigos`, abrigo);
  }

  buscarTodos(page?: number, size?: number): Observable<Page<Abrigo>> {
    return this.http.get<Page<Abrigo>>(`${environment.apiUrl}/abrigos?page=${page ?? 0}&size=${size ?? 10}`);
  }

  buscarPorId(id: any): Observable<Abrigo> {
    return this.http.get<Abrigo>(`${environment.apiUrl}/abrigos/${id}`);
  }

  atualizar(abrigo: Abrigo): Observable<Abrigo> {
    return this.http.put<Abrigo>(`${environment.apiUrl}/abrigos/${abrigo.id}`, abrigo);
  }

  listarPets(idOuNome: String): Observable<Pets[]> {
    return this.http.get<Pets[]>(`${environment.apiUrl}/abrigos/${idOuNome}/pets`);
  }

  cadastrarPets(idOuNome: String, pets: Pets): Observable<Pets> {
    return this.http.post<Pets>(`${environment.apiUrl}/abrigos/${idOuNome}/pets`, pets);
  }
}
