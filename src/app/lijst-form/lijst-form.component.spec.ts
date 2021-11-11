import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LijstFormComponent } from './lijst-form.component';

describe('LijstFormComponent', () => {
  let component: LijstFormComponent;
  let fixture: ComponentFixture<LijstFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LijstFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LijstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
