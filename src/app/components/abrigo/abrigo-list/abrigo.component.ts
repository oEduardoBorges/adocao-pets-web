import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Abrigo } from '../../../models/abrigo';
import { AbrigoService } from '../../../services/abrigo.service';
import { Page } from '../../../models/page';
import { HeaderService } from '../../../services/header.service';

@Component({
  selector: 'app-abrigo',
  templateUrl: './abrigo.component.html',
  styleUrls: ['./abrigo.component.css']
})
export class AbrigoComponent implements OnInit {

  ELEMENT_DATA: Abrigo[] = [];

  displayedColumns: string[] = ['nome', 'telefone', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Abrigo>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private abrigoService: AbrigoService, private headerService: HeaderService) {}

  ngOnInit(): void {
    this.buscarTodos();
  }

  buscarTodos(page?: number, size?: number) {
    this.abrigoService.buscarTodos(page, size).subscribe((resposta: Page<Abrigo>) => {
      this.ELEMENT_DATA = resposta.content;
      
      // Formatando os números de telefone
      this.ELEMENT_DATA.forEach(abrigo => {
        abrigo.telefone = this.formatarTelefone(abrigo.telefone as string);
      });

      this.dataSource = new MatTableDataSource<Abrigo>(this.ELEMENT_DATA);
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
