import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.mode';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from '../../services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent implements OnInit {
  public usuarios: Usuario[] = [];
  public doctores: Doctor[] = [];
  public hospitales: Hospital[] = [];

  constructor(
    private activatadRoute: ActivatedRoute,
    private busquedasService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.activatadRoute.params.subscribe(({ termino }) => {
      this.busquedaGlobal(termino);
    });
  }

  busquedaGlobal(termino: string) {
    this.busquedasService.busquedaGlobal(termino).subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
      this.doctores = resp.doctores;
      this.hospitales = resp.hospitales;
    });
  }
}
