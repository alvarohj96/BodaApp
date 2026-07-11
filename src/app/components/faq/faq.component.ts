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
      pregunta: '¿Tengo que confirmar mi asistencia o puedo aparecer de sorpresa como en las películas?',
      respuesta: 'Por favor, confírma. Hay un formulario en esta web que nos ha costado la misma vida hacer y ahí nos lo tienes que indicar. Si apareces por sorpresa, el catering te mirará con odio y probablemente te toque cenar un trozo de pan sentado en las rodillas de un primo lejano. Tienes hasta el 5 de Marzo para decir "Sí, voy" o "No, me lo pierdo"',
      abierto: false
    },
    {
      pregunta: '¿Puedo llevar a alguien más?',
      respuesta: '<strong>Si es famoso, sí.</strong> Si no, mejor pregúntanos antes de aparecer con tu primo de Cuenca y su nueva novia. De todas formas, echa un ojo al formulario, porque todas las parejas ya están incluidas allí.',      
      abierto: false
    },
    {
      pregunta: '¿Cuál es el código de vestimenta?',
      respuesta: 'Ponte algo que haga que tu madre se sienta orgullosa. Si vienes de blanco, la novia tiene permiso legal para lanzarte una copa de vino tinto (es broma... o no).',
      abierto: false
    },
    {
      pregunta: '¿A qué hora termina la fiesta?',
      respuesta: 'Cuando el DJ se canse o los novios huyamos. <strong>Lo que ocurra primero.</strong> Aunque, siendo realistas, la música dejará de sonar sobre las 23:30. ¡Hay que darlo todo antes de que nos echen!',      
      abierto: false
    },
    {
      pregunta: '¿Habrá bus?',
      respuesta: 'Estamos estudiando poner un autobús, pero depende de vosotros. Si sois suficientes los que preferís brindar sin miedo al control de alcoholemia, ¡lo pondremos! Dínoslo al confirmar. Si acabamos siendo cuatro gatos, nos tocará compartir taxi o venir en patinete.',
      abierto: false
    },
    {
      pregunta: '¿Qué pasa con los regalos?',
      respuesta: 'Vuestra presencia es el mejor regalo... <strong>pero si insistís, nuestra cuenta bancaria no es tímida.</strong> Si queréis ayudarnos a pagar la hipoteca o a que no acabemos comiendo arroz blanco en la luna de miel, preferimos el efectivo. Tenemos una hucha gigante (y muy segura) esperando vuestro granito de arena. ¡Vuestras aportaciones son la gasolina de nuestra felicidad post-boda!',
      abierto: false
    },
    {
      pregunta: '¿Y qué pasa si soy alérgico, vegetariano o no puedo ver el gluten ni en pintura?',
      respuesta: '¡Tranquilidad! No queremos que nadie termine la noche en urgencias. En el formulario de confirmación verás un apartado para dejarnos claro qué no puedes comer. El catering se encargará de que tengas un menú a tu medida (y libre de peligro).',
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