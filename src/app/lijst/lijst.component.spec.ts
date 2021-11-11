import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LijstComponent } from './lijst.component';

describe('LijstComponent', () => {
  let component: LijstComponent;
  let fixture: ComponentFixture<LijstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LijstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
