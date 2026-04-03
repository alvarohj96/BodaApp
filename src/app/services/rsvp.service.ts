import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RsvpData {
  nombre: string;
  asistencia: string;
  personas: number;
  ninos: number;
  restricciones: string[];
  mensaje: string;
}

@Injectable({ providedIn: 'root' })
export class RsvpService {

  private readonly SHEET_URL = 'https://script.google.com/macros/s/AKfycbz7LNYKoeiiWmCzUqS3GNQLLlG36AODfEhhRB7YC5EES7z3UaQoSsxUAsu46VQcelA1/exec';

  constructor(private http: HttpClient) { }

  enviarRsvp(data: RsvpData): Observable<any> {
    const params = new HttpParams()
      .set('nombre', data.nombre)
      .set('asistencia', data.asistencia)
      .set('personas', String(data.personas))
      .set('ninos', String(data.ninos))
      .set('restricciones', data.restricciones.join(', ') || 'Ninguna')
      .set('mensaje', data.mensaje);

    return this.http.post(this.SHEET_URL, params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'text'
    });
  }
}