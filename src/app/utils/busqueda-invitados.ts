import { Invitado } from '../models/wedding.models';

export type TipoCoincidencia = 'principal' | 'acompanante';

export interface Sugerencia {
  /** Grupo (invitación) al que pertenece la coincidencia. */
  invitado: Invitado;
  /** Si el texto buscado coincide con el invitado principal o con su acompañante. */
  tipo: TipoCoincidencia;
}

/** Nombre genérico que se usa en los datos cuando aún no se sabe quién acompaña. */
const NOMBRE_GENERICO_ACOMPANANTE = 'acompanante';

/** Minúsculas, sin tildes ni diacríticos y con espacios normalizados. */
export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/**
 * Devuelve las coincidencias por nombre de pila del invitado principal y por
 * nombre del acompañante (se ignoran mayúsculas y tildes). No busca por
 * apellidos para no revelar la lista completa.
 */
export function buscarSugerencias(invitados: Invitado[], texto: string): Sugerencia[] {
  const consulta = normalizar(texto);
  if (consulta.length < 2) return [];

  const resultado: Sugerencia[] = [];
  for (const invitado of invitados) {
    if (normalizar(invitado.nombre).startsWith(consulta)) {
      resultado.push({ invitado, tipo: 'principal' });
    }

    if (invitado.tieneAcompanante && invitado.nombreAcompanante) {
      const nombreAcomp = normalizar(invitado.nombreAcompanante);
      if (nombreAcomp !== NOMBRE_GENERICO_ACOMPANANTE && nombreAcomp.startsWith(consulta)) {
        resultado.push({ invitado, tipo: 'acompanante' });
      }
    }
  }
  return resultado;
}
