import { Invitado } from '../models/wedding.models';
import { buscarSugerencias, normalizar } from './busqueda-invitados';

describe('buscarSugerencias', () => {
  const invitados: Invitado[] = [
    { id: '1', nombre: 'Jesús',  apellidos: '',    tieneAcompanante: true,  nombreAcompanante: 'Belén' },
    { id: '2', nombre: 'Marisa', apellidos: 'J.',  tieneAcompanante: true,  nombreAcompanante: 'David H.' },
    { id: '3', nombre: 'Belen',  apellidos: 'G.',  tieneAcompanante: true,  nombreAcompanante: 'Fabio' },
    { id: '4', nombre: 'Carlos', apellidos: '',    tieneAcompanante: true,  nombreAcompanante: 'Acompañante' },
    { id: '5', nombre: 'Pedro',  apellidos: '',    tieneAcompanante: false },
  ];

  it('normaliza mayúsculas, tildes y espacios', () => {
    expect(normalizar('  JESÚS  ')).toBe('jesus');
  });

  it('no busca con menos de 2 caracteres', () => {
    expect(buscarSugerencias(invitados, 'j')).toEqual([]);
  });

  it('encuentra invitados principales ignorando tildes y mayúsculas', () => {
    const r = buscarSugerencias(invitados, 'jesus');
    expect(r.length).toBe(1);
    expect(r[0].tipo).toBe('principal');
    expect(r[0].invitado.id).toBe('1');
  });

  it('encuentra acompañantes e indica su grupo', () => {
    const r = buscarSugerencias(invitados, 'DAVID');
    expect(r.length).toBe(1);
    expect(r[0].tipo).toBe('acompanante');
    expect(r[0].invitado.id).toBe('2');
  });

  it('devuelve principal y acompañante cuando comparten nombre', () => {
    const r = buscarSugerencias(invitados, 'belen');
    expect(r.map(s => `${s.invitado.id}:${s.tipo}`)).toEqual(['1:acompanante', '3:principal']);
  });

  it('ignora el nombre genérico "Acompañante"', () => {
    expect(buscarSugerencias(invitados, 'acomp')).toEqual([]);
  });
});
