import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  cargarDoctores() {
    const url = `${base_url}/doctores`;
    return this.http
      .get(url, this.headers)
      .pipe(map((resp: { ok: boolean; doctores: Doctor[] }) => resp.doctores));
  }

  crearDoctor(doctor: { nombre: string; hospital: string }) {
    const url = `${base_url}/doctores`;
    return this.http.post(url, doctor, this.headers);
  }

  actualizarDoctor(doctor: Doctor) {
    const url = `${base_url}/doctores/${doctor._id}`;
    return this.http.put(url, doctor, this.headers);
  }

  borrarDoctor(doctor: Doctor) {
    const url = `${base_url}/doctores/${doctor._id}`;
    return this.http.delete(url, this.headers);
  }

  getDoctorById(id: string) {
    const url = `${base_url}/doctores/${id}`;
    return this.http
      .get(url, this.headers)
      .pipe(map((resp: { ok: boolean; doctor: Doctor }) => resp.doctor));
  }
}
