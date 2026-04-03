import {
  Component,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RsvpService } from '../../services/rsvp.service';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class RsvpComponent implements OnDestroy {

  form: FormGroup;
  estado: 'idle' | 'enviando' | 'enviado' | 'error' = 'idle';
  nombreEnviado = '';
  private sub: Subscription | null = null;

  alergias = [
    { id: 'vegetariano', label: 'Vegetariano' },
    { id: 'vegano', label: 'Vegano' },
    { id: 'sin-gluten', label: 'Sin gluten' },
    { id: 'sin-lactosa', label: 'Sin lactosa' },
    { id: 'alergia-marisco', label: 'Alergia marisco' },
    { id: 'alergia-frutos', label: 'Alergia frutos secos' },
    { id: 'como-de-todo', label: 'Como de todo, sin filtros' },
  ];

  opcionesAsistencia = [
    { value: 'si', icon: '🎉', title: '¡Allí estaré!', sub: 'Ya estoy eligiendo el outfit', iconClass: 'icon-si' },
    { value: 'no', icon: '😿', title: 'No puedo ir', sub: 'Tengo que lavar a mi gato', iconClass: 'icon-no' },
    { value: 'quiza', icon: '🤷', title: 'Quizás...', sub: 'Depende del horóscopo', iconClass: 'icon-quiza' }
  ];

  mensajesExito: Record<string, string> = {
    si: 'Nos alegramos muchísimo de que vengas. Ya puedes ir eligiendo el outfit.',
    no: 'Lo entendemos. Esperamos que el gato quede muy limpio.',
    quiza: 'Entendido. El horóscopo tiene la última palabra.'
  };

  get mensajeExito(): string {
    return this.mensajesExito[this.form.get('asistencia')?.value] ?? '';
  }

  get personas(): number { return this.form.get('personas')!.value; }

  get ninos(): number { return this.form.get('ninos')!.value; }

  constructor(
    private fb: FormBuilder,
    private rsvpService: RsvpService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      asistencia: ['', Validators.required],
      personas: [1],
      ninos: [0],
      restricciones: [[]],
      mensaje: [''],
    });
  }

  cambiarPersonas(delta: number): void {
    const nuevo = Math.max(1, Math.min(15, this.personas + delta));
    this.form.patchValue({ personas: nuevo });
  }

  cambiarNinos(delta: number): void {
    const nuevo = Math.max(0, Math.min(2, this.ninos + delta));
    this.form.patchValue({ ninos: nuevo });
  }

  toggleAlergia(id: string): void {
    const actual: string[] = this.form.get('restricciones')!.value;
    const nuevo = actual.includes(id)
      ? actual.filter(a => a !== id)
      : [...actual, id];
    this.form.patchValue({ restricciones: nuevo });
  }

  tieneAlergia(id: string): boolean {
    return (this.form.get('restricciones')!.value as string[]).includes(id);
  }

  private actualizarEstado(estado: 'enviado' | 'error'): void {
    this.estado = estado;
    this.cdr.detectChanges();
  }

  enviar(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    this.estado = 'enviando';
    this.nombreEnviado = this.form.value.nombre.split(' ')[0];
    this.cdr.detectChanges();
    this.sub = this.rsvpService.enviarRsvp(this.form.value).subscribe({
      next: () => this.actualizarEstado('enviado'),
      error: () => this.actualizarEstado('error')
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}