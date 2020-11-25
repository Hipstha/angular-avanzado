import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';

// Mentenientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { DoctoresComponent } from './mantenimientos/doctores/doctores.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { DoctorComponent } from './mantenimientos/doctores/doctor.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { title: 'ProgressBar' },
      },
      {
        path: 'grafica1',
        component: Grafica1Component,
        data: { title: 'Gráfica #1' },
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { title: 'Ajustes de cuenta' },
      },
      {
        path: 'promesas',
        component: PromesasComponent,
        data: { title: 'Promesas' },
      },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
      {
        path: 'perfil',
        component: PerfilComponent,
        data: { title: 'Perfil de usuario' },
      },
      {
        path: 'buscar/:termino',
        component: BusquedaComponent,
        data: { title: 'Busquedas' },
      },
      //  Mentenimientos
      {
        //ADMIN
        path: 'usuarios',
        canActivate: [AdminGuard],
        component: UsuariosComponent,
        data: { title: 'Usuarios de aplicación' },
      },
      {
        path: 'doctores',
        component: DoctoresComponent,
        data: { title: 'doctores de aplicación' },
      },
      {
        path: 'doctor/:id',
        component: DoctorComponent,
        data: { title: 'doctores de aplicación' },
      },
      {
        path: 'hospitales',
        component: HospitalesComponent,
        data: { title: 'hospitales de aplicación' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
