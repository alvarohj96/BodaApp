import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem {
  pregunta: string;
  respuesta: string;
  abierto: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {

  faqs: FaqItem[] = [
    {
      pregunta: '¿Hay barra libre?',
      respuesta: '<strong>Sí, hasta que se acabe el dinero o el alcohol</strong>, lo que ocurra primero. Apostamos por el alcohol. Por si acaso, lleva algo de efectivo.',
      abierto: true
    },
    {
      pregunta: '¿Cuál es el código de vestimenta?',
      respuesta: 'Vístete guapo/a, pero <strong>deja espacio para bailar y comer</strong>. Spoiler: comerás mucho. Tacones bajo tu propia responsabilidad.',
      abierto: false
    },
    {
      pregunta: '¿Puedo llevar a alguien más?',
      respuesta: '<strong>Si es famoso, sí.</strong> Si no, mejor pregunta antes de aparecer con tu primo de Cuenca y su nueva novia.',
      abierto: false
    },
    {
      pregunta: '¿A qué hora termina la fiesta?',
      respuesta: 'Cuando el DJ se canse o los novios huyan. <strong>Lo que ocurra primero.</strong> Históricamente, huimos nosotros.',
      abierto: false
    },
    {
      pregunta: '¿Habrá photocall?',
      respuesta: 'Por supuesto. Es <strong>obligatoria al menos una foto ridícula</strong> con los novios. Sin excusas de "me han salido los ojos rojos".',
      abierto: false
    },
    {
      pregunta: '¿Qué hago si lloro?',
      respuesta: 'Es normal, bienvenido/a al club. <strong>Habrá pañuelos estratégicamente colocados.</strong> La dama de honor Llora-Siempre te acompañará en tu momento.',
      abierto: false
    },
    {
      pregunta: '¿Qué pasa con los regalos?',
      respuesta: 'Vuestra presencia es el mejor regalo... <strong>pero si insistís, nuestra cuenta bancaria no es tímida.</strong> Os pasamos los datos con mucho gusto y poca vergüenza.',
      abierto: false
    }
  ];

  toggle(index: number): void {
    this.faqs = this.faqs.map((faq, i) => ({
      ...faq,
      abierto: i === index ? !faq.abierto : false  // cierra el resto
    }));
  }
}