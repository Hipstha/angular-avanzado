import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, EMPTY, Subject } from 'rxjs';

import { RouterMedicoComponent } from './router-medico.component';

class FakeRouter {
  navigate(params) {}
}

class FakeActivatedRoute {
  // params: Observable<any> = EMPTY;
  private subject = new Subject();
  push(valor) {
    this.subject.next(valor);
  }
  get params() {
    return this.subject.asObservable();
  }
}

describe('RouterMedicoComponent', () => {
  let component: RouterMedicoComponent;
  let fixture: ComponentFixture<RouterMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RouterMedicoComponent],
      providers: [
        { provide: Router, useClass: FakeRouter },
        { provide: ActivatedRoute, useClass: FakeActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('Debe redireccionar a medico cuando se guarde', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    component.guardadMedico();
    expect(spy).toHaveBeenCalledWith(['medico', '123']);
  });

  it('debe colocar el id = nuevo', () => {
    component = fixture.componentInstance;
    const activatedRoute: FakeActivatedRoute = TestBed.get(ActivatedRoute);
    activatedRoute.push({ id: 'nuevo' });
    expect(component.id).toBe('nuevo');
  });
});
