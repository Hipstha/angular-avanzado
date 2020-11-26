import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe contener un routerLink a la página de médicos', () => {
    // const fixture = TestBed.createComponent(AppComponent);
    const elementos = fixture.debugElement.queryAll(
      By.directive(RouterLinkWithHref)
    );

    console.log(elementos);

    let existe = false;
    for (const elem of elementos) {
      if (elem.attributes['routerLink'] === '/medicos') {
        existe = true;
        break;
      }
    }

    expect(existe).toBeTruthy();
  });
});
