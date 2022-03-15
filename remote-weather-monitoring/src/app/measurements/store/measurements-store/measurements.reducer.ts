import { Action, combineReducers } from "@ngrx/store";
import { authState } from "src/core/pages/login-page/store/auth.reducers";

export interface measurementsState {
    measurementsData: any;
}

export const initialMeasurementsState: measurementsState = {
    measurementsData: {}
}

const reducer = combineReducers<measurementsState>({
    measurementsData: {} as any

}, initialMeasurementsState);

export function measurementsReducer(state: measurementsState | undefined, action: Action) {
    return reducer(state, action);
}