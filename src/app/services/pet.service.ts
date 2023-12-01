import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Page } from '../models/page';
import { Pets } from '../models/pets';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private http: HttpClient) { }

  listarTodosPets(page?: number, size?: number): Observable<Page<Pets>> {
    return this.http.get<Page<Pets>>(`${environment.apiUrl}/pets?page=${page ?? 0}&size=${size ?? 10}`);
  }
}
