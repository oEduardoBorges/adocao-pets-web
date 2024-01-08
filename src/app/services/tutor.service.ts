import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../models/page';
import { Tutor } from '../models/tutor';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TutorService {

  constructor(private http: HttpClient) { }

  cadastrar(tutor: Tutor): Observable<Tutor> {
    return this.http.post<Tutor>(`${environment.apiUrl}/tutores`, tutor);
  }

  buscarTodos(page?: number, size?: number): Observable<Page<Tutor>> {
    return this.http.get<Page<Tutor>>(`${environment.apiUrl}/tutores?page=${page ?? 0}&size=${size ?? 10}`);
  }

  buscarPorId(id: any): Observable<Tutor> {
    return this.http.get<Tutor>(`${environment.apiUrl}/tutores/${id}`);
  }

  atualizar(tutor: Tutor): Observable<Tutor> {
    return this.http.put<Tutor>(`${environment.apiUrl}/tutores/${tutor.id}`, tutor);
  }
}
