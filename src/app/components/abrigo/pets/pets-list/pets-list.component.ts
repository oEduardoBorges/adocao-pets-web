import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AbrigoService } from '../../../../services/abrigo.service';
import { Abrigo } from '../../../../models/abrigo';
import { ActivatedRoute } from '@angular/router';
import { Pets } from '../../../../models/pets';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrl: './pets-list.component.css'
})
export class PetsListComponent implements OnInit {

  admin = false;
  user = false;

  abrigo: Abrigo = {
    id:       '',
    nome:     '',
    telefone: '',
    email:    ''
  }

  ELEMENT_DATA: Pets[] = [];

  displayedColumns: string[] = ['id', 'tipo', 'nome', 'raca', 'idade'];
  dataSource = new MatTableDataSource<Pets>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private abrigoService: AbrigoService, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.abrigo.id = this.route.snapshot.paramMap.get('id');
    this.buscarAbrigoPorId();
    this.listarPets();

    const userRole = this.authService.getRole();

    if(userRole === 'ADMIN') {
      this.admin = true;
    } else if(userRole === 'USER') {
      this.user = true;
    }
  }

  buscarAbrigoPorId(): void {
    this.abrigoService.buscarPorId(this.abrigo.id).subscribe(resposta => {
      this.abrigo = resposta;
    })
  }

  listarPets() {
    this.abrigoService.listarPets(this.abrigo.id).subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Pets>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
