import { Routes } from '@angular/router';
import { InicioComponent } from '../features/inicio/inicio.component';
import { FestivosComponent } from '../features/festivos/festivos.component';
import { FestivosAgregarComponent } from '../features/festivos/festivos-agregar/festivos-agregar.component';
import { FestivosEditarComponent } from '../features/festivos/festivos-editar/festivos-editar.component';

export const routes: Routes = [
  { path: "", redirectTo: "inicio", pathMatch: "full" },
  { path: "inicio", component: InicioComponent },

  { path: "festivos", component: FestivosComponent },
  { path: "festivos/agregar", component: FestivosAgregarComponent },
  { path: "festivos/editar/:id", component: FestivosEditarComponent }
];
