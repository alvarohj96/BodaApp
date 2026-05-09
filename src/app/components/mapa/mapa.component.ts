import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent {

  readonly lugar = {
    nombre:      'Real Fábrica de Cristales de La Granja',
    direccion:   'P.º Pocillo, 1, 40100 Real Sitio de San Ildefonso, Segovia',
    descripcion: 'Un palacio del cristal del siglo XVIII. Elegimos este lugar porque nos pareció tan bonito que casi nos olvidamos de casarnos y nos quedamos de visita.',
    googleMaps:  'https://maps.google.com/?cid=2561555549949744660',
    waze:        'https://waze.com/ul?ll=40.9026628,-4.0071640&navigate=yes',
    telefono:    '+34 921 01 07 00',
  };

  readonly aparcamiento = {
    nombre:    'Aparcamiento recomendado',
    direccion: 'Paseo Fuente del Príncipe, 1, 40100 Real Sitio de San Ildefonso, Segovia',
    nota:      'Gratuito y a 3 minutos andando. Perfecto para llegar sin dramas de parking.',
    googleMaps:'https://maps.google.com/?cid=6430732038527662086',
    waze:      'https://waze.com/ul?ll=40.9043405,-4.005986&navigate=yes',
  };

  readonly info = [
    { icono: '🕛', titulo: 'Hora de llegada',  texto: '12:00 — Puntualidad apreciada, retrasos tolerados con amor' },
    { icono: '🚗', titulo: 'Cómo llegar',      texto: 'A 1h de Madrid por la A-6 y AP-61. En GPS escribe "La Real Fábrica de Cristales"' },
    { icono: '🅿️', titulo: 'Parking',          texto: 'Paseo Fuente del Príncipe. Gratuito, abierto 24h, a 300m del recinto' },
  ];

  abrirMapa(url: string): void {
    window.open(url, '_blank');
  }
}