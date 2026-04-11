import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

export interface RsvpData {
  nombre:        string;
  asistencia:    string;
  restricciones: string[];
  mensaje:       string;
  ninos:         number;
}

@Injectable({ providedIn: 'root' })
export class RsvpService {

  private readonly SHEET_URL = 'https://script.google.com/macros/s/AKfycbwV6rO_l6rwimgd5dZKjYmlsrYQrfJtPbB7mt8tDE4uBPnHAmoYe1QlOny744eH-G6q/exec';

  enviarRsvpRaw(data: Record<string, string>): Observable<any> {
    // Usamos un <form> invisible que hace submit directo a Google
    // Esto evita completamente el CORS porque no es una petición XHR
    return from(this.enviarConForm(data));
  }

  private enviarConForm(data: Record<string, string>): Promise<void> {
    return new Promise((resolve) => {
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = this.SHEET_URL;
      form.target = 'hidden-iframe'; // envía a un iframe invisible

      // Crea un campo por cada dato
      Object.entries(data).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type  = 'hidden';
        input.name  = key;
        input.value = value ?? '';
        form.appendChild(input);
      });

      // Crea el iframe invisible que recibe la respuesta
      const iframe = document.createElement('iframe');
      iframe.name  = 'hidden-iframe';
      iframe.style.display = 'none';

      // Cuando el iframe carga = el form se envió correctamente
      iframe.onload = () => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
        resolve();
      };

      document.body.appendChild(iframe);
      document.body.appendChild(form);
      form.submit();

      // Timeout de seguridad por si onload no dispara
      setTimeout(() => resolve(), 3000);
    });
  }
}