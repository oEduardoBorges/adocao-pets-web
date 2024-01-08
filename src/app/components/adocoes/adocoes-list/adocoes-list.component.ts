import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Page } from '../../../models/page';
import { HeaderService } from '../../../services/header.service';
import { Adocao } from '../../../models/adocao';
import { AdocaoService } from '../../../services/adocao.service';

@Component({
  selector: 'app-adocoes-list',
  templateUrl: './adocoes-list.component.html',
  styleUrl: './adocoes-list.component.css'
})
export class AdocoesListComponent {

  admin = false;
  user = false;

  ELEMENT_DATA: Adocao[] = [];

  displayedColumns: string[] = ['idAdocao', 'idPet', 'idTutor', 'motivo', 'status'];
  dataSource = new MatTableDataSource<Adocao>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private adocaoService: AdocaoService, private headerService: HeaderService, private authService: AuthService) {}

  ngOnInit(): void {
    this.buscarTodos();
  }

  buscarTodos(page?: number, size?: number) {
    this.adocaoService.buscarTodos(page, size).subscribe((resposta: Page<Adocao>) => {
      this.ELEMENT_DATA = resposta.content;

      this.dataSource = new MatTableDataSource<Adocao>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

