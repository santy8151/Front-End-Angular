export interface Pais {
  id: number;
  nombre: string;
}

export interface TipoFestivo {
  id: number;
  nombre: string;
}

export interface Festivo {
  id: number;
  nombre: string;
  dia: number;
  mes: number;
  diasPascua: number;
  pais: Pais;
  tipo: TipoFestivo;
  // campos derivados opcionales que usamos en la vista
  fecha?: string;
  tipoNombre?: string;
  paisNombre?: string;
}
