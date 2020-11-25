import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public auth2: any;
  public usuario: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role;
  }

  googleInit() {
    return new Promise((resolve) => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id:
            '53568048550-hgk9q4ecb1cqokljk08jbt1oqk5m2mt4.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  guardarLocalStorate(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    // TODO: borrar menu

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  validarToken(): Observable<boolean> {
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { email, google, nombre, role, uid, img = '' } = resp.usuarioDB;
          this.usuario = new Usuario(nombre, email, '', img, google, uid, role);
          this.guardarLocalStorate(resp.token, resp.menu);
          return true;
        }),
        catchError((error) => {
          return of(false);
        })
      );
  }

  public crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        this.guardarLocalStorate(resp.token, resp.menu);
      })
    );
  }

  actualizarPerfil(data: { email: string; nombre: string; role: string }) {
    data = {
      ...data,
      role: this.usuario.role,
    };
    return this.http.put(
      `${base_url}/usuarios/${this.uid}`,
      data,
      this.headers
    );
  }

  public login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        this.guardarLocalStorate(resp.token, resp.menu);
      })
    );
  }

  public loginGoogle(token) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        this.guardarLocalStorate(resp.token, resp.menu);
      })
    );
  }

  public cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;

    return this.http.get<CargarUsuario>(url, this.headers).pipe(
      map((resp) => {
        const usuarios = resp.usuarios.map(
          (user) =>
            new Usuario(
              user.nombre,
              user.email,
              '',
              user.img,
              user.google,
              user.uid,
              user.role
            )
        );
        return {
          total: resp.total,
          usuarios,
        };
      })
    );
  }

  public eliminarUsuario(usuario: Usuario) {
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);
  }

  guardarUsuario(usuario: Usuario) {
    return this.http.put(
      `${base_url}/usuarios/${usuario.uid}`,
      usuario,
      this.headers
    );
  }
}
