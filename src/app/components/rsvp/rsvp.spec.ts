import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.html'
})
export class RsvpComponent {

  form: FormGroup;
  enviado = false;

  opciones = [
    { valor: 'si',     emoji: '🎉', texto: '¡Cuenten conmigo, ya estoy eligiendo el outfit!' },
    { valor: 'no',     emoji: '😿', texto: 'Lo siento, tengo que lavar a mi gato.' },
    { valor: 'quizas', emoji: '🤷', texto: 'Depende del horóscopo, te confirmo en mayo.' }
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre:       ['', Validators.required],
      asistencia:   ['', Validators.required],
      numeroPax:    [1, [Validators.min(1), Validators.max(10)]],
      restriccion:  [''],
      mensaje:      ['']
    });
  }

  enviar() {
    if (this.form.valid) {
      console.log('RSVP enviado:', this.form.value);
      // Aquí conectarías con un backend, EmailJS, Formspree, etc.
      this.enviado = true;
    }
  }
}