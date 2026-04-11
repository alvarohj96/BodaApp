import { Invitado } from '../models/wedding.models';

export const INVITADOS: Invitado[] = [
  { id: '1',  nombre: 'Carlos',   apellidos: 'García López',     tieneAcompanante: true,  nombreAcompanante: 'Laura Martín' },
  { id: '2',  nombre: 'Carlos',   apellidos: 'Fernández Ruiz',   tieneAcompanante: true,  nombreAcompanante: 'Ana Sánchez'  },
  { id: '3',  nombre: 'María',    apellidos: 'López Hernández',  tieneAcompanante: false  },
  { id: '4',  nombre: 'María',    apellidos: 'Pérez González',   tieneAcompanante: true,  nombreAcompanante: 'Javier Díaz'  },
  { id: '5',  nombre: 'Lucía',    apellidos: 'Martínez Moreno',  tieneAcompanante: false  },
  { id: '6',  nombre: 'Pablo',    apellidos: 'Romero Jiménez',   tieneAcompanante: true,  nombreAcompanante: 'Elena Torres' },
  // ... añade todos tus invitados aquí
];