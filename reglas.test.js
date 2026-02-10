// reglas.test.js
import { calcularNuevoMarcador } from "./reglas";

describe("Tests para calcularNuevoMarcador", () => {

  test("Escenario A: 10 + 2 = 12", () => {
    const resultado = calcularNuevoMarcador(10, 2);
    expect(resultado).toBe(12);
  });

  test("Escenario B: 10 + 3 = 13", () => {
    const resultado = calcularNuevoMarcador(10, 3);
    expect(resultado).toBe(13);
  });

});
