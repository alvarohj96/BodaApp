import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface EventoHorario {
  hora: string;
  nombre: string;
  desc: string;
  icono: string;
  highlight: boolean;
}

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss']
})
export class HorarioComponent {

  eventos: EventoHorario[] = [
    { hora: '13:00 h', nombre: 'Llegada', icono: '🚗', highlight: false, desc: '' },
    { hora: '13:30 h', nombre: 'Ceremonia', icono: '💍', highlight: true, desc: '' },
    { hora: '14:30 h', nombre: 'Cóctel', icono: '🥂', highlight: false, desc: '' },
    { hora: '16:30 h', nombre: 'Comida', icono: '🍽️', highlight: false, desc: '' },
    { hora: '18:30 h', nombre: 'Fiesta', icono: '🎶', highlight: false, desc: '' },
    { hora: '23:30 h', nombre: 'Fin', icono: '🌙', highlight: false, desc: '' },
  ];
}