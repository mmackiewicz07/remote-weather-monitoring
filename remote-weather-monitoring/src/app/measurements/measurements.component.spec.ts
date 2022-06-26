import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/shared/shared.module';

import { MeasurementsComponent } from './measurements.component';

describe('MeasurementsComponent', () => {
  let component: MeasurementsComponent;
  let fixture: ComponentFixture<MeasurementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeasurementsComponent],
      imports: [
        StoreModule.forRoot({}),
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp({
          apiKey: 'AIzaSyC4QjmNWMTP9TNjGC1TGdOfzuej3GVGSEU',
          authDomain: 'remote-weather-monitoring.firebaseapp.com',
          databaseURL:
            'https://remote-weather-monitoring-default-rtdb.europe-west1.firebasedatabase.app',
          projectId: 'remote-weather-monitoring',
          storageBucket: 'remote-weather-monitoring.appspot.com',
          messagingSenderId: '1020522371565',
          appId: '1:1020522371565:web:6a30d09665515ae34e2fe4',
          measurementId: 'G-W2HZR78LJT',
        }),
        AngularFirestoreModule,
        SharedModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have deafult state value', () => {
    expect(component.photoresistorValue).toBeUndefined();
    expect(component.humidityValue).toBeUndefined();
    expect(component.pressureValue).toBeUndefined();
    expect(component.smokeValue).toBeUndefined();
    expect(component.temperatureValue).toBeUndefined();
  });
});
