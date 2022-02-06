import { createSelector } from "@ngrx/store";
import { createListStateSelectors } from "src/core/commons/list/list.selectors";
import { createOperationStateSelectors } from "src/core/commons/operation/operation.selectors";
import { authState } from "../auth.reducers";

const slectAuthState = createSelector(authState, (state) => state?.authState);

export const login = createSelector(slectAuthState, (state) => state?.isLogged);

export const singUp = createSelector(slectAuthState, (state) => state?.isAccountCreated);

export const resetPassword = createSelector(slectAuthState, (state) => state?.resetPassword);


export const loginState = createOperationStateSelectors(login).selectState;

export const registerState = createOperationStateSelectors(singUp).selectState;

export const resetPasswordState = createOperationStateSelectors(resetPassword).selectState;

export const loginStateLoading = createOperationStateSelectors(loginState).selectLoading;
export const loginStateSuccess = createOperationStateSelectors(loginState).selectSuccess;
export const loginStateError = createOperationStateSelectors(loginState).selectError;
export const loggedUserData = createOperationStateSelectors(loginState).selectRes;

export const registerStateLoading = createOperationStateSelectors(registerState).selectLoading;
export const registerStateSuccess = createOperationStateSelectors(registerState).selectSuccess;
export const registerStateError = createOperationStateSelectors(registerState).selectError;

export const resetPasswordStateLoading = createOperationStateSelectors(resetPasswordState).selectLoading;
export const resetPasswordStateSuccess = createOperationStateSelectors(resetPasswordState).selectSuccess;
export const resetPasswordStateError = createOperationStateSelectors(resetPasswordState).selectError;
;
