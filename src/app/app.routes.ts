import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { HistoriaComponent } from './components/historia/historia.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { FaqComponent } from './components/faq/faq.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { RsvpComponent } from './components/rsvp/rsvp';

export const routes: Routes = [
  { path: '',        component: HeroComponent },
  { path: 'historia',component: HistoriaComponent },
  { path: 'faq',     component: FaqComponent },
  { path: 'mapa',    component: MapaComponent },
  { path: 'rsvp',    component: RsvpComponent },
  { path: '**',      redirectTo: '' }
];