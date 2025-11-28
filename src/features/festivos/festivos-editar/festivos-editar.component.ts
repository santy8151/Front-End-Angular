import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FestivosService } from '../../../core/servicios/festivos.service';
import { Festivo } from '../../../core/modelos/festivo.model';

@Component({
  selector: 'app-festivos-editar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './festivos-editar.component.html',
  styleUrls: ['./festivos-editar.component.css']
})
export class FestivosEditarComponent {
  festivo: Festivo | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicio: FestivosService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.servicio.obtenerFestivoPorId(id).subscribe({
      next: data => {
        this.festivo = data;
      }
    });
  }

  actualizar(): void {
    if (!this.festivo) return;
    this.servicio.actualizarFestivo(this.festivo.id, this.festivo).subscribe({
      next: () => {
        this.router.navigate(['/festivos']);
      }
    });
  }

  volver(): void {
    this.router.navigate(['/festivos']);
  }
}
