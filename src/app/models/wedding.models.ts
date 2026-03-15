export interface HonorMember {
  nombre: string;
  apodo: string;
  rol: string;
  habilidadEspecial: string;
  emoji: string;
  foto?: string;
}

export interface FaqItem {
  pregunta: string;
  respuesta: string;
  emoji: string;
}

export interface RsvpForm {
  nombre: string;
  asistencia: 'si' | 'no' | 'quizas';
  numeroPax: number;
  restriccionAlimentaria: string;
  mensaje: string;
}

export interface MapLocation {
  lat: number;
  lng: number;
  titulo: string;
  descripcionDivertida: string;
  icono: string;
}