import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlojamientosComponent } from './alojamientos.component';

describe('AlojamientosComponent', () => {
  let component: AlojamientosComponent;
  let fixture: ComponentFixture<AlojamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlojamientosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlojamientosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
