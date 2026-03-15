import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeddingService } from '../../services/wedding.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countdown',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy {

  dias = 0;
  horas = 0;
  minutos = 0;
  segundos = 0;
  private timer: any;

  constructor(private weddingService: WeddingService) {}

  ngOnInit() {
    this.timer = setInterval(() => this.calcularTiempo(), 1000);
    this.calcularTiempo();
  }

  private calcularTiempo() {
    const ahora = new Date().getTime();
    const boda = this.weddingService.weddingDate.getTime();
    const diferencia = boda - ahora;

    this.dias     = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    this.horas    = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutos  = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    this.segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}