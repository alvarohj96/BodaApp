import { Routes } from '@angular/router';
import { HorarioComponent } from './components/horario/horario.component';
import { HeroComponent } from './components/hero/hero.component';
import { FaqComponent } from './components/faq/faq.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { RsvpComponent } from './components/rsvp/rsvp.component';
import { AlojamientosComponent } from './components/alojamientos/alojamientos.component';

export const routes: Routes = [
  { path: '',        component: HeroComponent },
  { path: 'horario', component: HorarioComponent },
  { path: 'faq',     component: FaqComponent },
  { path: 'mapa',    component: MapaComponent },
  { path: 'rsvp',    component: RsvpComponent },
  { path: 'alojamientos', component: AlojamientosComponent }, 
  { path: '**',      redirectTo: '' }
];