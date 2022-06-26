import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurmenthistoryDetailsComponent } from './measurment-history-details.component';

describe('MeasurmenthistoryDetailsComponent', () => {
  let component: MeasurmenthistoryDetailsComponent;
  let fixture: ComponentFixture<MeasurmenthistoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeasurmenthistoryDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurmenthistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
