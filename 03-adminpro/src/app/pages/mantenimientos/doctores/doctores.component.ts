import { Component, OnInit, OnDestroy } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { Subscription } from 'rxjs';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styles: [],
})
export class DoctoresComponent implements OnInit, OnDestroy {
  public doctores: Doctor[] = [];
  public doctoresTemp: Doctor[] = [];
  public cargando = true;
  private imgSubs: Subscription;

  constructor(
    private doctorService: DoctorService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarDoctores();
    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarDoctores());
  }

  cargarDoctores() {
    this.cargando = true;
    this.doctorService.cargarDoctores().subscribe((doctores) => {
      this.cargando = false;
      this.doctores = doctores;
      this.doctoresTemp = doctores;
    });
  }

  abrirModal(doctor: Doctor) {
    this.modalImagenService.abrirModal('doctores', doctor._id, doctor.img);
  }

  busqueda(termino: string) {
    if (termino.length === 0) {
      return (this.doctores = this.doctoresTemp);
    }
    this.busquedasService
      .buscar('doctores', termino)
      .subscribe((resultados) => {
        this.doctores = resultados;
      });
  }

  borrarDoctor(doctor: Doctor) {
    Swal.fire({
      title: 'Esta seguro que desea borrar?',
      text: `Esta a punto de borrar a ${doctor.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorService.borrarDoctor(doctor).subscribe((resp) => {
          Swal.fire(
            'Doctor eliminado',
            `${doctor.nombre} fue eliminado correctamente`,
            'success'
          );
          this.cargarDoctores();
        });
      }
    });
  }
}
