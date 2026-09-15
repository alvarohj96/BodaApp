import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Alojamiento {
  nombre:      string;
  tipo:        string;
  direccion:   string;
  distancia:   string;
  icono:       string;
  destacado:   boolean;
  booking?:    string;
  web?:        string;
  telefono?:   string;
}

@Component({
  selector: 'app-alojamientos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alojamientos.component.html',
  styleUrls: ['./alojamientos.component.scss']
})
export class AlojamientosComponent {

  alojamientos: Alojamiento[] = [
    {
      nombre:      'Hotel La Farm',
      tipo:        'Hotel',
      direccion:   'La Granja, Segovia',
      distancia:   'A 5 min de la finca',
      icono:       '🏡',
      destacado:   false,
      booking:     'https://www.booking.com',
    },
    {
      nombre:      'Hotel Isabel de Farnesio',
      tipo:        'Hotel',
      direccion:   'La Granja, Segovia',
      distancia:   'A 2 min de la finca',
      icono:       '⭐',
      destacado:   true,
      booking:     'https://www.booking.com',
    },
    {
      nombre:      'Parador de La Granja',
      tipo:        'Parador Nacional',
      direccion:   'La Granja, Segovia',
      distancia:   'A 10 min de la finca',
      icono:       '🏰',
      destacado:   false,
      web:         'https://www.parador.es',
    },
  ];

  abrirEnlace(url: string): void {
    window.open(url, '_blank');
  }
}