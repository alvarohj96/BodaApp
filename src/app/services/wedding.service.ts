import { Injectable } from '@angular/core';
import { HonorMember, FaqItem, MapLocation } from '../models/wedding.models';

@Injectable({ providedIn: 'root' })
export class WeddingService {

  readonly weddingDate = new Date('2027-06-05T12:00:00'); // ← cambia la fecha

  getHonorMembers(): HonorMember[] {
    return [
      {
        nombre: 'Carlos',
        apodo: 'El Padrino que no llora... mucho',
        rol: 'Padrino',
        habilidadEspecial: 'Experto en abrir botellas con los dientes',
        emoji: '🍾'
      },
      {
        nombre: 'Laura',
        apodo: 'La que ya está llorando con esto',
        rol: 'Dama de honor',
        habilidadEspecial: 'Llora en bodas, anuncios de televisión y openings de anime',
        emoji: '😭'
      },
      {
        nombre: 'Marta',
        apodo: 'La organizadora compulsiva',
        rol: 'Dama de honor',
        habilidadEspecial: 'Tiene una hoja de cálculo para todo, incluso para esto',
        emoji: '📊'
      }
      // añade más miembros aquí
    ];
  }

  getFaqItems(): FaqItem[] {
    return [
      {
        pregunta: '¿Hay barra libre?',
        respuesta: 'Sí, hasta que se acabe el dinero o el alcohol, lo que ocurra primero. Apostamos por el dinero.',
        emoji: '🍻'
      },
      {
        pregunta: '¿Cuál es el código de vestimenta?',
        respuesta: 'Vístete guapo/a, pero deja espacio para bailar y comer. Spoiler: comerás mucho.',
        emoji: '👗'
      },
      {
        pregunta: '¿Puedo llevar a alguien más?',
        respuesta: 'Si es famoso, sí. Si no, mejor pregunta antes de aparecer con tu primo de Cuenca.',
        emoji: '🤔'
      },
      {
        pregunta: '¿A qué hora termina?',
        respuesta: 'Cuando el DJ se canse o los novios huyan. Lo que ocurra primero.',
        emoji: '🕐'
      },
      {
        pregunta: '¿Habrá photocall?',
        respuesta: 'Por supuesto. Es obligatorio al menos una foto ridícula con los novios.',
        emoji: '📸'
      }
    ];
  }

  getMapLocations(): MapLocation[] {
    return [
      {
        lat: 40.4168,
        lng: -3.7038,
        titulo: 'La Ceremonia',
        descripcionDivertida: 'Aquí dijimos que sí. O al menos eso nos dijeron que digéramos.',
        icono: '💍'
      },
      {
        lat: 40.4200,
        lng: -3.7000,
        titulo: 'El Banquete',
        descripcionDivertida: 'Aquí se come, se bebe y se baila hasta que el cuerpo aguante.',
        icono: '🍽️'
      },
      {
        lat: 40.4150,
        lng: -3.7100,
        titulo: 'Primera cita',
        descripcionDivertida: 'Aquí fue la primera cita y la última vez que me invitó a algo. Desde entonces pago yo.',
        icono: '❤️'
      }
    ];
  }
}