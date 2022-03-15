import { combineReducers, createFeatureSelector } from "@ngrx/store";
import { featureStoreEnum } from "src/core/app-store/featureStore.enum";
import * as measurementsStore from './measurements-store/measurements.reducer';

export interface measurementsState {
    measurementsState: measurementsStore.measurementsState
}

export const initialState: measurementsState = {
    measurementsState: measurementsStore.initialMeasurementsState
}

export const reducer = combineReducers<measurementsState>({
    measurementsState: measurementsStore.measurementsReducer
}, initialState);

export const measurementsState = createFeatureSelector<measurementsState>(featureStoreEnum.measurements);