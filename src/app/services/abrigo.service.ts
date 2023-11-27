import { environment } from './../../environments/environment';
import { Page } from './../models/page';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Abrigo } from '../models/abrigo';

@Injectable({
  providedIn: 'root'
})
export class AbrigoService {

  constructor(private http: HttpClient) { }

  buscarTodos(page?: number, size?: number): Observable<Page<Abrigo>> {
    return this.http.get<Page<Abrigo>>(`${environment.apiUrl}/abrigos?page=${page ?? 0}&size=${size ?? 10}`);
  }

  buscarPorId(id: string): Observable<Abrigo> {
    return this.http.get<Abrigo>(`${environment.apiUrl}/abrigos/${id}`);
  }
}
