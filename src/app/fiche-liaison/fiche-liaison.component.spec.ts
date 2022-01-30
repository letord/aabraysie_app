import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheLiaisonComponent } from './fiche-liaison.component';

describe('FicheLiaisonComponent', () => {
  let component: FicheLiaisonComponent;
  let fixture: ComponentFixture<FicheLiaisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheLiaisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheLiaisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
