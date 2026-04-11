import {
  Component,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RsvpService } from '../../services/rsvp.service';
import { Invitado } from '../../models/wedding.models';
import { INVITADOS } from '../../data/guests.data';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class RsvpComponent implements OnDestroy {

  // ── Estado del buscador ──────────────────────────────
  busqueda = '';
  sugerencias: Invitado[] = [];
  invitadoSeleccionado: Invitado | null = null;
  mostrarSugerencias = false;

  // ── Estado del formulario ────────────────────────────
  form: FormGroup;
  formAcompanante: FormGroup;
  rellenarAcompanante = false;
  estado: 'idle' | 'enviando' | 'enviado' | 'error' = 'idle';
  private sub: Subscription | null = null;

  alergias = [
    { id: 'vegetariano', label: 'Vegetariano' },
    { id: 'vegano', label: 'Vegano' },
    { id: 'sin-gluten', label: 'Sin gluten' },
    { id: 'sin-lactosa', label: 'Sin lactosa' },
    { id: 'alergia-marisco', label: 'Alergia marisco' },
    { id: 'alergia-frutos', label: 'Alergia frutos secos' },
    { id: 'como-de-todo', label: 'Como de todo' },
  ];

  opcionesAsistencia = [
    { value: 'si', icon: '🎉', title: '¡Allí estaré!', sub: 'Ya estoy eligiendo el outfit', iconClass: 'icon-si' },
    { value: 'no', icon: '😿', title: 'No puedo ir', sub: 'Tengo que lavar a mi gato', iconClass: 'icon-no' },
    { value: 'quiza', icon: '🤷', title: 'Quizás...', sub: 'Depende del horóscopo', iconClass: 'icon-quiza' },
  ];

  mensajesExito: Record<string, string> = {
    si: 'Nos alegramos muchísimo de que vengas. Ya puedes ir eligiendo el outfit.',
    no: 'Lo entendemos. Esperamos que el gato quede muy limpio.',
    quiza: 'Entendido. El horóscopo tiene la última palabra.',
  };

  get mensajeExito(): string {
    return this.mensajesExito[this.form.get('asistencia')?.value] ?? '';
  }

  constructor(
    private fb: FormBuilder,
    private rsvpService: RsvpService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      asistencia: ['', Validators.required],
      restricciones: [[]],
      mensaje: [''],
    });

    this.formAcompanante = this.fb.group({
      asistencia: ['', Validators.required],
      restricciones: [[]],
      mensaje: [''],
    });
  }

  // ── Buscador ─────────────────────────────────────────
  onBusqueda(event: Event): void {
    const valor = (event.target as HTMLInputElement).value.trim();
    this.busqueda = valor;
    this.invitadoSeleccionado = null;

    if (valor.length < 2) {
      this.sugerencias = [];
      this.mostrarSugerencias = false;
      return;
    }

    // Filtra solo por nombre (no apellidos) para no revelar la lista completa
    const nombreBusqueda = valor.toLowerCase();
    this.sugerencias = INVITADOS.filter(i =>
      i.nombre.toLowerCase().startsWith(nombreBusqueda)
    );
    this.mostrarSugerencias = this.sugerencias.length > 0;
  }

  seleccionarInvitado(invitado: Invitado): void {
    this.invitadoSeleccionado = invitado;
    this.busqueda = `${invitado.nombre} ${invitado.apellidos}`;
    this.mostrarSugerencias = false;
    this.sugerencias = [];
    this.rellenarAcompanante = false;
    this.cdr.detectChanges();
  }

  cerrarSugerencias(): void {
    // Pequeño delay para que el click en sugerencia se procese antes
    setTimeout(() => {
      this.mostrarSugerencias = false;
      this.cdr.detectChanges();
    }, 200);
  }

  limpiarSeleccion(): void {
    this.invitadoSeleccionado = null;
    this.busqueda = '';
    this.sugerencias = [];
    this.mostrarSugerencias = false;
    this.form.reset();
    this.formAcompanante.reset();
    this.rellenarAcompanante = false;
    this.cdr.detectChanges();
  }

  // ── Alergias ─────────────────────────────────────────
  toggleAlergia(id: string, esAcompanante = false, event?: MouseEvent): void {
    event?.preventDefault();  // ← evita que el foco salte al formulario

    const formTarget = esAcompanante ? this.formAcompanante : this.form;
    const actual: string[] = [...formTarget.get('restricciones')!.value];

    const nuevo = actual.includes(id)
      ? actual.filter(a => a !== id)
      : [...actual, id];

    formTarget.patchValue({ restricciones: nuevo });
    formTarget.get('restricciones')!.markAsDirty();
    this.cdr.detectChanges();
  }

  tieneAlergia(id: string, esAcompanante = false): boolean {
    const formTarget = esAcompanante ? this.formAcompanante : this.form;
    const valor = formTarget.get('restricciones')!.value as string[];
    return Array.isArray(valor) && valor.includes(id);  // ← comprueba que sea array antes
  }

  // ── Envío ─────────────────────────────────────────────
  private actualizarEstado(estado: 'enviado' | 'error'): void {
    this.estado = estado;
    this.cdr.detectChanges();
  }

  enviar(): void {
    if (!this.invitadoSeleccionado) return;
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    if (this.rellenarAcompanante && this.formAcompanante.invalid) {
      this.formAcompanante.markAllAsTouched(); return;
    }

    this.estado = 'enviando';
    this.cdr.detectChanges();

    const payload: Record<string, string> = {
      invitadoId: this.invitadoSeleccionado.id,
      nombre: `${this.invitadoSeleccionado.nombre} ${this.invitadoSeleccionado.apellidos}`,
      asistencia: this.form.value.asistencia,
      restricciones: this.form.value.restricciones.join(', ') || 'Ninguna',
      mensaje: this.form.value.mensaje ?? '',
      acompanante: this.invitadoSeleccionado.nombreAcompanante ?? '',  // ← ?? '' en lugar de undefined
      acompananteAsiste: this.rellenarAcompanante
        ? this.formAcompanante.value.asistencia
        : 'no confirmado',
      acompananteAlerg: this.rellenarAcompanante
        ? (this.formAcompanante.value.restricciones.join(', ') || 'Ninguna')
        : '',
      acompanantemensaje: this.rellenarAcompanante
        ? (this.formAcompanante.value.mensaje ?? '')
        : '',
    };

    this.sub = this.rsvpService.enviarRsvpRaw(payload).subscribe({
      next: () => this.actualizarEstado('enviado'),
      error: () => this.actualizarEstado('error')
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}