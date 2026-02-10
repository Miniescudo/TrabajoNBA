// reglas.js

/**
 * Función pura que calcula el nuevo marcador
 * @param {number} puntajeActual - puntos actuales del equipo
 * @param {number} puntosASumar - puntos a añadir (2 o 3)
 * @returns {number} nuevo total de puntos
 */
export const calcularNuevoMarcador = (puntajeActual, puntosASumar) => {
  return puntajeActual + puntosASumar;
};
