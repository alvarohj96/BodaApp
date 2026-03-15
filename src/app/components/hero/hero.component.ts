import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, OnDestroy {

  constructor(private cdr: ChangeDetectorRef) {}

  private readonly WEDDING_DATE = new Date('2027-06-05T12:00:00');
  private timer: ReturnType<typeof setInterval> | null = null;

  dias  = '000';
  horas = '00';
  min   = '00';
  seg   = '00';

  // Para la animación de pulso al cambiar el segundo
  segPulse = false;

  ngOnInit(): void {
    this.tick();
    this.timer = setInterval(() => this.tick(), 1000);
  }

  private tick(): void {
    const diff = this.WEDDING_DATE.getTime() - Date.now();

    const d = Math.floor(diff / 86_400_000);
    const h = Math.floor((diff % 86_400_000) / 3_600_000);
    const m = Math.floor((diff % 3_600_000)  / 60_000);
    const s = Math.floor((diff % 60_000)     / 1_000);

    const nuevoSeg = this.pad(s, 2);
    const cambio   = nuevoSeg !== this.seg;

    this.dias  = this.pad(d, 3);
    this.horas = this.pad(h, 2);
    this.min   = this.pad(m, 2);
    this.seg   = nuevoSeg;

    // Pulso al cambiar de segundo
    if (cambio) {
      this.segPulse = true;
      setTimeout(() => (this.segPulse = false), 150);
    }
    this.cdr.detectChanges(); 
  }

  private pad(n: number, len: number): string {
    return String(Math.max(0, n)).padStart(len, '0');
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }
}