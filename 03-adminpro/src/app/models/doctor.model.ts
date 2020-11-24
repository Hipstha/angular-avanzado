import { Hospital } from './hospital.mode';

interface _DoctorUser {
  _id: string;
  nombre: string;
  img: string;
}

export class Doctor {
  constructor(
    public nombre: string,
    // tslint:disable-next-line: variable-name
    public _id?: string,
    public img?: string,
    public usuairo?: _DoctorUser,
    public hospital?: Hospital
  ) {}
}
