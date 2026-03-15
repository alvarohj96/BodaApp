import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorteHonor } from './corte-honor';

describe('CorteHonor', () => {
  let component: CorteHonor;
  let fixture: ComponentFixture<CorteHonor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorteHonor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorteHonor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
