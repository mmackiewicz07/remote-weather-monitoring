import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { featureStoreEnum } from "src/core/app-store/featureStore.enum";
import { SharedModule } from "src/shared/shared.module";
import { MeasurementsComponent } from "./measurements.component";
import { MeasurementsEffects } from "./store/measurements-store/measurements.effects";
import { MeasurementsService } from "./store/measurements-store/measurements.service";
import * as FromMeasurements from './store/measurements.reducers'

@NgModule({
    declarations: [MeasurementsComponent],
    imports: [RouterModule, SharedModule, ReactiveFormsModule, CommonModule, StoreModule.forFeature(featureStoreEnum.measurements, FromMeasurements.reducer), EffectsModule.forFeature([MeasurementsEffects])],
    exports: [],
    providers: [MeasurementsService]
})

export class MeasurementsModule { }