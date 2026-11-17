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
import { Sugerencia, buscarSugerencias } from '../../utils/busqueda-invitados';

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
  sugerencias: Sugerencia[] = [];
  /** Grupo (invitación) real del que forma parte la persona seleccionada. */
  grupoSeleccionado: Invitado | null = null;
  /** True si la persona que ha buscado su nombre es el acompañante del grupo. */
  esAcompanante = false;
  /**
   * Persona que rellena el formulario. Si busca el invitado principal es el propio
   * grupo; si busca al acompañante, es una vista con el acompañante como titular y
   * el invitado principal como "otra persona" opcional del grupo.
   */
  invitadoSeleccionado: Invitado | null = null;
  mostrarSugerencias = false;

  // ── Estado del formulario ────────────────────────────
  form: FormGroup;
  formAcompanante: FormGroup;
  rellenarAcompanante = false;
  estado: 'idle' | 'enviando' | 'enviado' | 'error' = 'idle';
  private sub: Subscription | null = null;
  private subs = new Subscription();

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
  ];

  opcionesPlato = [
    { value: 'carne', icon: '🥩', title: 'Carne', sub: 'Para los carnívoros', iconClass: 'icon-carne' },
    { value: 'pescado', icon: '🐟', title: 'Pescado', sub: 'Del mar a tu plato', iconClass: 'icon-pescado' },
  ];

  mensajesExito: Record<string, string> = {
    si: 'Nos alegramos muchísimo de que vengas. Ya puedes ir eligiendo el outfit.',
    no: 'Lo entendemos. Esperamos que el gato quede muy limpio.',
  };

  /** Cómo llamar en el formulario a la otra persona del grupo. */
  get etiquetaOtro(): string {
    return this.esAcompanante ? 'invitado principal' : 'acompañante';
  }

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
      platoPrincipal: [''],
      restricciones: [[]],
      mensaje: [''],
    });

    this.formAcompanante = this.fb.group({
      asistencia: ['', Validators.required],
      platoPrincipal: [''],
      restricciones: [[]],
      mensaje: [''],
    });

    this.vincularPlatoConAsistencia(this.form);
    this.vincularPlatoConAsistencia(this.formAcompanante);
  }

  /**
   * El plato principal solo es obligatorio si la persona asiste ("si").
   * Si cambia a "no", se limpia la elección y se quita la validación.
   */
  private vincularPlatoConAsistencia(group: FormGroup): void {
    const asistencia = group.get('asistencia')!;
    const plato = group.get('platoPrincipal')!;

    this.subs.add(
      asistencia.valueChanges.subscribe(valor => {
        if (valor === 'si') {
          plato.setValidators([Validators.required]);
        } else {
          plato.clearValidators();
          plato.setValue('', { emitEvent: false });
          plato.markAsUntouched();
        }
        plato.updateValueAndValidity({ emitEvent: false });
      })
    );
  }

  private readonly valoresIniciales = {
    asistencia: '',
    platoPrincipal: '',
    restricciones: [] as string[],
    mensaje: '',
  };

  private platoSiAsiste(group: FormGroup): string {
    return group.value.asistencia === 'si' ? (group.value.platoPrincipal ?? '') : '';
  }

  // ── Buscador ─────────────────────────────────────────
  onBusqueda(event: Event): void {
    const valor = (event.target as HTMLInputElement).value.trim();
    this.busqueda = valor;
    this.invitadoSeleccionado = null;
    this.grupoSeleccionado = null;
    this.esAcompanante = false;

    // Busca por nombre de pila del invitado o de su acompañante (sin tildes ni
    // mayúsculas) y no por apellidos, para no revelar la lista completa
    this.sugerencias = buscarSugerencias(INVITADOS, valor);
    this.mostrarSugerencias = this.sugerencias.length > 0;
  }

  seleccionarSugerencia(sugerencia: Sugerencia): void {
    const grupo = sugerencia.invitado;
    this.grupoSeleccionado = grupo;
    this.esAcompanante = sugerencia.tipo === 'acompanante';

    this.invitadoSeleccionado = this.esAcompanante
      ? {
          id: grupo.id,
          nombre: grupo.nombreAcompanante!,
          apellidos: '',
          tieneAcompanante: true,
          nombreAcompanante: `${grupo.nombre} ${grupo.apellidos}`.trim(),
        }
      : grupo;

    this.busqueda = `${this.invitadoSeleccionado.nombre} ${this.invitadoSeleccionado.apellidos}`.trim();
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
    this.grupoSeleccionado = null;
    this.esAcompanante = false;
    this.busqueda = '';
    this.sugerencias = [];
    this.mostrarSugerencias = false;
    this.form.reset({ ...this.valoresIniciales });
    this.formAcompanante.reset({ ...this.valoresIniciales });
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
    if (!this.invitadoSeleccionado || !this.grupoSeleccionado) return;
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    if (this.rellenarAcompanante && this.formAcompanante.invalid) {
      this.formAcompanante.markAllAsTouched(); return;
    }

    this.estado = 'enviando';
    this.cdr.detectChanges();

    const grupo = this.grupoSeleccionado;

    // `form` es siempre quien ha buscado su nombre y `formAcompanante` la otra
    // persona del grupo (opcional). Se reasigna a invitado principal / acompañante
    // para que el payload mantenga siempre la misma estructura (una fila por grupo).
    const formPrincipal = this.esAcompanante
      ? (this.rellenarAcompanante ? this.formAcompanante : null)
      : this.form;
    const formAcomp = this.esAcompanante
      ? this.form
      : (this.rellenarAcompanante ? this.formAcompanante : null);

    const restricciones = (f: FormGroup) => f.value.restricciones.join(', ') || 'Ninguna';

    const payload: Record<string, string> = {
      invitadoId: grupo.id,
      nombre: `${grupo.nombre} ${grupo.apellidos}`,
      asistencia: formPrincipal ? formPrincipal.value.asistencia : 'no confirmado',
      platoPrincipal: formPrincipal ? this.platoSiAsiste(formPrincipal) : '',
      restricciones: formPrincipal ? restricciones(formPrincipal) : '',
      mensaje: formPrincipal ? (formPrincipal.value.mensaje ?? '') : '',
      acompanante: grupo.nombreAcompanante ?? '',  // ← ?? '' en lugar de undefined
      acompananteAsiste: formAcomp ? formAcomp.value.asistencia : 'no confirmado',
      acompanantePlato: formAcomp ? this.platoSiAsiste(formAcomp) : '',
      acompananteAlerg: formAcomp ? restricciones(formAcomp) : '',
      acompanantemensaje: formAcomp ? (formAcomp.value.mensaje ?? '') : '',
      respondePor: this.esAcompanante ? 'acompanante' : 'principal',
    };

    this.sub = this.rsvpService.enviarRsvpRaw(payload).subscribe({
      next: () => this.actualizarEstado('enviado'),
      error: () => this.actualizarEstado('error')
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.subs.unsubscribe();
  }
}