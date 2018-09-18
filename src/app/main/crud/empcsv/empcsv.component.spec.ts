import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpcsvComponent } from './empcsv.component';

describe('EmpcsvComponent', () => {
  let component: EmpcsvComponent;
  let fixture: ComponentFixture<EmpcsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpcsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpcsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
