import { Action, combineReducers } from "@ngrx/store";
import { operationReducer } from "src/core/commons/operation/operation.reducer";
import { resetPassword, signInActions, signUpActions } from "./auth.actions";

export interface authState {
    isAccountCreated: any;
    isLogged: any;
    resetPassword: any;
}

export const initialAuthState: authState = {
    isAccountCreated: false,
    isLogged: false,
    resetPassword: {}
}

const reducer = combineReducers<authState>({
    isAccountCreated: operationReducer(signUpActions),
    isLogged: operationReducer(signInActions),
    resetPassword: operationReducer(resetPassword)
}, initialAuthState);


export function authReducer(state: authState | undefined, action: Action) {
    return reducer(state, action);
}