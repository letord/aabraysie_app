import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionItemComponent } from './intervention-item.component';

describe('InterventionItemComponent', () => {
  let component: InterventionItemComponent;
  let fixture: ComponentFixture<InterventionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterventionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
