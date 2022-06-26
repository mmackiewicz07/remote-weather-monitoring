import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/shared/shared.module';
import { AppMaterialModule } from 'src/shared/app-material.module';
import { CoreModule } from 'src/core/core.module';
import { AppStoreModule } from 'src/core/app-store/app-store.module';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { UserComponent } from './user/user.component';
import { MeasurementsModule } from './measurements/measurements.module';
import { MeasurementsHistoryComponent } from './measurements-history/measurements-history.component';
import { MeasurmenthistoryDetailsComponent } from './measurements-history/measurment-history-details/measurment-history-details.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MeasurementsStore } from './measurements-history/measurment-history-details/measurements-store.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    MeasurementsHistoryComponent,
    MeasurmenthistoryDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AppMaterialModule,
    CoreModule,
    AppStoreModule,
    HttpClientModule,
    MeasurementsModule,
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
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [MeasurementsStore],
  bootstrap: [AppComponent],
})
export class AppModule {}
