import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Adocao } from '../models/adocao';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class AdocaoService {

  constructor(private http: HttpClient) { }

  buscarTodos(page?: number, size?: number): Observable<Page<Adocao>> {
    return this.http.get<Page<Adocao>>(`${environment.apiUrl}/adocoes?page=${page ?? 0}&size=${size ?? 10}`);
  }

  cadastrar(adocao: Adocao): Observable<Adocao> {
    return this.http.post<Adocao>(`${environment.apiUrl}/adocoes`, adocao);
  }

}
