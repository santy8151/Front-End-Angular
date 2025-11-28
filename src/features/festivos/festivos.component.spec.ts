import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Festivos } from './festivos.component';

describe('Festivos', () => {
  let component: Festivos;
  let fixture: ComponentFixture<Festivos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Festivos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Festivos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
