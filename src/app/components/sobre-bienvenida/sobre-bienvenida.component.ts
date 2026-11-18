import { Component, OnDestroy, signal } from '@angular/core';

type EstadoSobre = 'cerrado' | 'abriendo' | 'saliendo' | 'fuera';

/** Clave de localStorage: si existe, el invitado ya abrió el sobre en este navegador. */
const CLAVE_STORAGE = 'boda-sobre-visto';

@Component({
  selector: 'app-sobre-bienvenida',
  standalone: true,
  templateUrl: './sobre-bienvenida.component.html',
  styleUrls: ['./sobre-bienvenida.component.scss']
})
export class SobreBienvenidaComponent implements OnDestroy {
  /** cerrado → abriendo (solapa + carta) → saliendo (fundido) → fuera (se elimina del DOM) */
  readonly estado = signal<EstadoSobre>(this.debeMostrarse() ? 'cerrado' : 'fuera');

  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    if (this.estado() !== 'fuera') {
      document.body.style.overflow = 'hidden'; // sin scroll mientras el sobre cubre la web
    }
  }

  abrir(): void {
    if (this.estado() !== 'cerrado') return;

    this.marcarComoVisto();

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

  /** Para probar: añadir ?sobre a la URL fuerza que el sobre aparezca aunque ya se haya visto. */
  private debeMostrarse(): boolean {
    if (new URLSearchParams(window.location.search).has('sobre')) return true;
    try {
      return localStorage.getItem(CLAVE_STORAGE) !== '1';
    } catch {
      return true; // localStorage bloqueado (modo privado, etc.)
    }
  }

  private marcarComoVisto(): void {
    try {
      localStorage.setItem(CLAVE_STORAGE, '1');
    } catch {
      /* sin localStorage: simplemente volverá a salir en la próxima visita */
    }
  }
}
