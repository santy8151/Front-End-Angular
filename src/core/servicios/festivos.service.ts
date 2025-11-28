import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Festivo } from '../modelos/festivo.model';

@Injectable({
  providedIn: 'root'
})
export class FestivosService {

  private url = '/api/festivos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Festivo[]> {
    return this.http.get<Festivo[]>(`${this.url}/listar`);
  }

  obtenerPorId(id: number): Observable<Festivo> {
    return this.http.get<Festivo>(`${this.url}/obtener/${id}`);
  }

  agregar(festivo: Festivo): Observable<Festivo> {
    return this.http.post<Festivo>(`${this.url}/agregar`, festivo);
  }

  modificar(festivo: Festivo): Observable<Festivo> {
    return this.http.put<Festivo>(`${this.url}/modificar`, festivo);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/eliminar/${id}`);
  }

  buscar(texto: string): Observable<Festivo[]> {
    return this.http.get<Festivo[]>(`${this.url}/buscar/${texto}`);
  }

  obtenerFestivoPorId(id: number): Observable<Festivo> {
    return this.obtenerPorId(id);
  }

  actualizarFestivo(id: number, festivo: Festivo): Observable<Festivo> {
    return this.modificar(festivo);
  }
}
