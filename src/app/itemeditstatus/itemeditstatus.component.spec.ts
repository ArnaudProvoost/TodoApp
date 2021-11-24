import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemeditstatusComponent } from './itemeditstatus.component';

describe('ItemeditstatusComponent', () => {
  let component: ItemeditstatusComponent;
  let fixture: ComponentFixture<ItemeditstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemeditstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemeditstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
