import { combineReducers, createFeatureSelector } from '@ngrx/store';
import { featureStoreEnum } from 'src/core/app-store/featureStore.enum';
import * as authStore from './auth-store/auth-reducer';

export interface authState {
    authState: authStore.authState
}

export const initialState: authState = {
    authState: authStore.initialAuthState
}

export const reducer = combineReducers<authState>({
    authState: authStore.authReducer
}, initialState);

export const authState = createFeatureSelector<authState>(featureStoreEnum.auth);