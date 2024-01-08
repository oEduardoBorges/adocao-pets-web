import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Page } from '../../../models/page';
import { HeaderService } from '../../../services/header.service';
import { Tutor } from '../../../models/tutor';
import { TutorService } from '../../../services/tutor.service';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrl: './tutor-list.component.css'
})
export class TutorListComponent {

  admin = false;
  user = false;

  ELEMENT_DATA: Tutor[] = [];

  displayedColumns: string[] = ['nome', 'telefone', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Tutor>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tutorService: TutorService, private headerService: HeaderService, private authService: AuthService) {}

  ngOnInit(): void {
    this.buscarTodos();

    const userRole = this.authService.getRole();

    if(userRole === 'ADMIN') {
      this.admin = true;
    } else if(userRole === 'USER') {
      this.user = true;
    }
  }

  buscarTodos(page?: number, size?: number) {
    this.tutorService.buscarTodos(page, size).subscribe((resposta: Page<Tutor>) => {
      this.ELEMENT_DATA = resposta.content;
      
      this.ELEMENT_DATA.forEach(abrigo => {
        abrigo.telefone = this.formatarTelefone(abrigo.telefone as string);
      });

      this.dataSource = new MatTableDataSource<Tutor>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  formatarTelefone(telefone: string): string {
    const numerosTelefone = telefone.replace(/\D/g, '');
  
    const codigoArea = numerosTelefone.slice(0, 2);
    const parte1 = numerosTelefone.slice(2, 6);
    const parte2 = numerosTelefone.slice(6);
  
    return `${codigoArea} ${parte1}-${parte2}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
