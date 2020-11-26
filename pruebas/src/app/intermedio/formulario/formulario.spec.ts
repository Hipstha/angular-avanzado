import { FormularioRegister } from './formulario';
import { FormBuilder } from '@angular/forms';

describe('Formularios', () => {
  let componente: FormularioRegister;

  beforeEach(() => {
    componente = new FormularioRegister(new FormBuilder());
  });

  it('Debe crear un formulario con dos campos, email y password', () => {
    expect(componente.form.contains('email')).toBe(true);
    expect(componente.form.contains('password')).toBe(true);
  });

  it('El email debe ser obligatorio', () => {
    const control = componente.form.get('email');
    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('El email debe ser un correo valido', () => {
    const control = componente.form.get('email');
    control.setValue('alejandro@hotmail.com');

    expect(control.valid).toBeTruthy();
  });
});
