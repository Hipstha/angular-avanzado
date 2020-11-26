import { mensaje } from './string';
// describe('Pruebas de strings');
// it('Debe de regresar un string');

describe('Pruebas de strings', () => {
  it('Debe regresar un string', () => {
    const resp = mensaje('Alejandro');
    expect(typeof resp).toBe('string');
  });

  it('Debe retornar un saludo con el nombre enviado', () => {
    const nombre = 'Alejandro';
    const resp = mensaje(nombre);
    expect(resp).toContain(nombre);
  });
});
