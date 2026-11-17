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
      respuesta: 'Por favor, confirma. Hay un formulario en esta web que nos ha costado la misma vida hacer y que necesitamos que rellenes. Si apareces por sorpresa, el catering te mirará con odio y probablemente te toque cenar un trozo de pan sentado en las rodillas de un primo lejano. Tienes hasta el 5 de marzo para decir «Sí, voy» o «No, me lo pierdo». ¡No nos dejes en suspense!',
      abierto: false
    },
    {
      pregunta: '¿Puedo llevar a alguien más?',
      respuesta: '<strong>Si es famoso, sí.</strong> Si no, mejor pregúntanos antes de aparecer con tu primo de Cuenca y su nueva novia. De todas formas, echa un ojo al formulario, porque todas las parejas invitadas ya están incluidas allí. ¡No queremos sorpresas en el seating plan!',
      abierto: false
    },
    {
      pregunta: '¿Cuál es el código de vestimenta?',
      respuesta: 'Ponte algo que haga que tu madre se sienta orgullosa. Si vienes de blanco, la novia tiene permiso legal para lanzarte una copa de vino tinto (es broma... o no). En resumen: elegante, guapo/a y, por favor, sin intentar competir con la novia.',
      abierto: false
    },
    {
      pregunta: '¿A qué hora termina la fiesta?',
      respuesta: 'La música dejará de sonar sobre las 23:30. <strong>¡Hay que darlo todo antes de que nos echen!</strong> Así que nada de reservar energía para después, que aquí hemos venido a bailar, no a calentar la silla.',
      abierto: false
    },
    {
      pregunta: '¿Qué pasa con los regalos?',
      respuesta: 'Vuestra presencia es el mejor regalo... pero si insistís, nuestra cuenta bancaria no es tímida <strong>(ES6221034255270010104838)</strong>. Si queréis ayudarnos a pagar la hipoteca o a evitar que acabemos comiendo arroz blanco durante la luna de miel, preferimos el efectivo. Tendremos una hucha gigante (y muy segura) esperando vuestro granito de arena. ¡Cada aportación nos acerca un poquito más a la felicidad financiera!',
      abierto: false
    },
    {
      pregunta: '¿Y qué pasa si soy alérgico, vegetariano o no puedo ver el gluten ni en pintura?',
      respuesta: '¡Tranquilidad! No queremos que nadie termine la noche en urgencias. En el formulario de confirmación encontrarás un apartado para contarnos qué alimentos no puedes comer. El catering se encargará de preparar un menú a tu medida. ¡Queremos que disfrutes de la boda, no que acabes negociando con una ambulancia!',
      abierto: false
    },
    {
      pregunta: '¿A qué hora tengo que llegar? ¿Vale eso de llegar cuando ya ha empezado todo?',
      respuesta: '¡NO! Bueno, puedes hacerlo, pero te perderás el principio y seguramente nos llevarás un disgusto. Os recomendamos llegar con unos 15-20 minutos de antelación para encontrar vuestro sitio, saludar a la gente y no hacer una entrada triunfal en mitad de la ceremonia. Ese protagonismo ya lo tenemos reservado nosotros.',
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