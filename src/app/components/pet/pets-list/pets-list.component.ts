import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Page } from '../../../models/page';
import { Pets } from '../../../models/pets';
import { PetService } from '../../../services/pet.service';


@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrl: './pets-list.component.css'
})
export class PetListComponent implements OnInit {

  ELEMENT_DATA: Pets[] = [];

  displayedColumns: string[] = ['id', 'tipo', 'nome', 'raca', 'idade'];
  dataSource = new MatTableDataSource<Pets>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private petsService: PetService) {}

  ngOnInit(): void {
    this.listarTodosPets();
  }

  listarTodosPets(page?: number, size?: number) {
    this.petsService.listarTodosPets(page, size).subscribe((resposta: Page<Pets>) => {
      this.ELEMENT_DATA = resposta.content;
      this.dataSource = new MatTableDataSource<Pets>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
