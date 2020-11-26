import { incrementar } from './numeros';

describe('Pruebas de numeros', () => {
  it('Debe de retornar 100 si el número ingresado es mayor a 100', () => {
    const res = incrementar(200);
    expect(res).toBe(100);
  });
  it('Debe retornar el número mas 1, si no es mayor a 100', () => {
    const res = incrementar(50);
    expect(res).toBe(51);
  });
});
