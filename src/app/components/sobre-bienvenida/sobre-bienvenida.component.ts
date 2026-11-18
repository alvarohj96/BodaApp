import { Component, OnDestroy, signal } from '@angular/core';

type EstadoSobre = 'cerrado' | 'abriendo' | 'saliendo' | 'fuera';

@Component({
  selector: 'app-sobre-bienvenida',
  standalone: true,
  templateUrl: './sobre-bienvenida.component.html',
  styleUrls: ['./sobre-bienvenida.component.scss']
})
export class SobreBienvenidaComponent implements OnDestroy {
  /** cerrado → abriendo (solapa + carta) → saliendo (fundido) → fuera (se elimina del DOM) */
  readonly estado = signal<EstadoSobre>('cerrado');

  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    document.body.style.overflow = 'hidden'; // sin scroll mientras el sobre cubre la web
  }

  abrir(): void {
    if (this.estado() !== 'cerrado') return;

    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.estado.set('abriendo');
    this.programar(() => this.estado.set('saliendo'), reducido ? 0 : 1400);
    this.programar(() => this.cerrar(), reducido ? 400 : 2300);
  }

  ngOnDestroy(): void {
    this.timers.forEach(clearTimeout);
    document.body.style.overflow = '';
  }

  private cerrar(): void {
    this.estado.set('fuera');
    document.body.style.overflow = '';
  }

  private programar(fn: () => void, ms: number): void {
    this.timers.push(setTimeout(fn, ms));
  }
}
