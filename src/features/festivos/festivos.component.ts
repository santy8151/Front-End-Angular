import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

import { FestivosService } from '../../core/servicios/festivos.service';
import { Festivo } from '../../core/modelos/festivo.model';
import { ReferenciasMaterialModule } from '../../shared/modulos/referencias-material.module';

@Component({
  selector: 'app-festivos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    ReferenciasMaterialModule
  ],
  templateUrl: './festivos.component.html',
  styleUrls: ['./festivos.component.css']
})
export class FestivosComponent implements OnInit {

  private servicio = inject(FestivosService);
  private router = inject(Router);
  private cd = inject(ChangeDetectorRef);

  textoBusqueda: string = '';

  // rows que usa la tabla ya con campos calculados (fecha, tipoNombre, paisNombre)
  rows: Festivo[] = [];
  dataSource: Festivo[] = [];

  // selección de fila
  selected: Festivo[] = [];

  displayedColumns: string[] = ['id', 'nombre', 'fecha', 'tipo'];

  ngOnInit(): void {
    this.cargarFestivos();
  }

  private mapearFestivos(data: Festivo[]): Festivo[] {
    return data.map(f => {
      const tieneDiaMes = !!f.dia && !!f.mes;

      const fecha = tieneDiaMes
        ? `${String(f.dia).padStart(2, '0')}/${String(f.mes).padStart(2, '0')}`
        : `Según Pascua (${f.diasPascua})`;

      return {
        ...f,
        fecha,
        tipoNombre: f.tipo?.nombre ?? '',
        paisNombre: f.pais?.nombre ?? ''
      };
    });
  }

  cargarFestivos(): void {
    this.servicio.listar().subscribe({
      next: (data: Festivo[]) => {
        const mapeados = this.mapearFestivos(data);
        this.rows = mapeados;
        this.dataSource = mapeados;
        this.cd.detectChanges(); // evita NG0100 con SSR
      },
      error: (err: any) => console.error('Error cargando festivos:', err)
    });
  }

  buscar(): void {
    const q = this.textoBusqueda.trim();
    if (!q) {
      this.cargarFestivos();
      return;
    }

    this.servicio.buscar(q).subscribe({
      next: (data: Festivo[]) => {
        const mapeados = this.mapearFestivos(data);
        this.rows = mapeados;
        this.dataSource = mapeados;
        this.cd.detectChanges();
      },
      error: (err: any) => console.error('Error buscando:', err)
    });
  }

  agregar(): void {
    this.router.navigate(['/festivos/agregar']);
  }

  modificar(): void {
    if (this.selected.length === 0) {
      alert('Seleccione un registro para editar');
      return;
    }
    const id = Number(this.selected[0].id);
    this.router.navigate(['/festivos/editar', id]);
  }

  eliminarSeleccionado(): void {
    if (this.selected.length === 0) {
      alert('Seleccione un registro para eliminar');
      return;
    }
    const id = Number(this.selected[0].id);

    this.servicio.eliminar(id).subscribe({
      next: () => this.cargarFestivos(),
      error: (err: any) => console.error('Error eliminando:', err)
    });
  }

  onRowSelect(row: Festivo): void {
    this.selected = [row];
  }
}
