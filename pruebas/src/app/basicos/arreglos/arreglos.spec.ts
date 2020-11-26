import { obtenerRobots } from './arreglos';
describe('Pruebas de arreglos', () => {
  it('Debe retornar al menos 3 robots', () => {
    const resp = obtenerRobots();
    expect(resp.length).toBeGreaterThanOrEqual(3);
  });
  it('Debe de existir megaman y zero', () => {
    const resp = obtenerRobots();
    expect(resp).toContain('megaman');
    expect(resp).toContain('zero');
  });
});
