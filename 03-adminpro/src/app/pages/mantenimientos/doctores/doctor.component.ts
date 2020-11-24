import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.mode';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';
import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [],
})
export class DoctorComponent implements OnInit {
  public doctorForm: FormGroup;
  public hospitales: Hospital[];
  public doctorSeleccionado: Doctor;
  public hospitalSeleccionado: Hospital;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarDoctor(id);
    });

    this.doctorForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.cargarHospitales();
    this.doctorForm.get('hospital').valueChanges.subscribe((hospitalId) => {
      this.hospitalSeleccionado = this.hospitales.find(
        (h) => h._id === hospitalId
      );
    });
  }

  cargarDoctor(id: string) {
    if (id === 'nuevo') {
      return;
    }
    this.doctorService
      .getDoctorById(id)
      .pipe(delay(100))
      .subscribe(
        (doctor) => {
          if (!doctor) {
            return this.router.navigateByUrl(`/dashboard/doctor`);
          }
          const {
            nombre,
            hospital: { _id },
          } = doctor;
          this.doctorSeleccionado = doctor;
          this.doctorForm.setValue({ nombre, hospital: _id });
        },
        (err) => {
          return this.router.navigateByUrl(`/dashboard/doctores`);
        }
      );
  }

  cargarHospitales() {
    this.hospitalService
      .cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }

  guardarDoctor() {
    const { nombre } = this.doctorForm.value;
    if (this.doctorSeleccionado) {
      // actualizar
      const data = {
        ...this.doctorForm.value,
        _id: this.doctorSeleccionado._id,
      };
      this.doctorService.actualizarDoctor(data).subscribe((resp) => {
        Swal.fire(
          'Actualizado',
          `${nombre} actualizado correctamente`,
          'success'
        );
      });
    } else {
      // crear
      this.doctorService
        .crearDoctor(this.doctorForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/doctor/${resp.doctor._id}`);
        });
    }
  }
}
