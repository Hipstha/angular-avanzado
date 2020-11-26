import { Component, OnInit } from '@angular/core';
import { MedicoService } from './medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  medicos: any[] = [];
  constructor(public medicosService: MedicoService) {}

  ngOnInit(): void {}

  saludarMedico(nombre: string) {
    return `Hola ${nombre}`;
  }

  obtenerMedicos() {
    this.medicosService.getMedicos().subscribe((medicos: any[]) => {
      this.medicos = medicos;
    });
  }
}
