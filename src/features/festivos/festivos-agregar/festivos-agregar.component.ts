import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FestivosService } from '../../../core/servicios/festivos.service';
import { Festivo } from '../../../core/modelos/festivo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-festivos-agregar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './festivos-agregar.component.html'
})
export class FestivosAgregarComponent {

  // MODELO CORRECTO PARA TU API
  festivo: Festivo = {
    id: 0,
    nombre: '',
    dia: 0,
    mes: 0,
    diasPascua: 0,
    pais: {
      id: 1,
      nombre: 'COLOMBIA'
    },
    tipo: {
      id: 1,
      nombre: 'Fijo'
    }
  };

  constructor(private servicio: FestivosService, private router: Router) {}

  guardar() {
    this.servicio.agregar(this.festivo).subscribe({
      next: () => this.router.navigate(['/festivos']),
      error: err => console.error(err)
    });
  }
}