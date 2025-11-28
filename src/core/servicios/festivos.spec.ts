import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FestivosService } from './festivos.service';

describe('FestivosService', () => {
  let service: FestivosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FestivosService]
    });

    service = TestBed.inject(FestivosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call listar() and return data', () => {
    const mockResponse = [{ id: 1, nombre: 'Año Nuevo' }];

    service.listar().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/festivos/listar');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call buscar() with a name', () => {
    const mockResponse = [{ id: 2, nombre: 'Navidad' }];

    service.buscar('Navidad').subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/festivos/buscar/Navidad');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call eliminar() with an ID', () => {
    const mockResponse = { message: 'Eliminado' };

    service.eliminar(10).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/festivos/eliminar/10');
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });
});
