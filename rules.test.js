// reglas.test.js
const { calcularNuevoMarcador } = require("./rules");


test("Escenario A: 10 puntos + canasta de 2 = 12", () => {
  const resultado = calcularNuevoMarcador(10, 2);
  expect(resultado).toBe(12);
});


test("Escenario B: 10 puntos + triple de 3 = 13", () => {
  const resultado = calcularNuevoMarcador(10, 3);
  expect(resultado).toBe(13);
});




