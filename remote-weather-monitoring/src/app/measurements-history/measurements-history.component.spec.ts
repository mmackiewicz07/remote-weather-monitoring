import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementsHistoryComponent } from './measurements-history.component';

describe('MeasurementsHistoryComponent', () => {
  let component: MeasurementsHistoryComponent;
  let fixture: ComponentFixture<MeasurementsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasurementsHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
