import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  obtenerUsuarios() {
    let params = new HttpParams().append('page', '1');
    params = params.append('nombre', 'Fernando Herrera');

    return this.http
      .get(`https://reqres.in/api/user`, {
        params,
      })
      .pipe(map((resp: any) => resp.data));
  }
}
