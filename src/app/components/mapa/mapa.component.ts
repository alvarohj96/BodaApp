import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { WeddingService } from '../../services/wedding.service';

@Component({
  selector: 'app-mapa',
  template: '<div id="mapa" style="height: 400px; border-radius: 16px;"></div>'
})
export class MapaComponent implements OnInit {

  constructor(private weddingService: WeddingService) {}

  ngOnInit() {
    const locations = this.weddingService.getMapLocations();
    const mapa = L.map('mapa').setView([locations[0].lat, locations[0].lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(mapa);

    locations.forEach(loc => {
      L.marker([loc.lat, loc.lng])
        .addTo(mapa)
        .bindPopup(`<b>${loc.icono} ${loc.titulo}</b><br>${loc.descripcionDivertida}`);
    });
  }
}