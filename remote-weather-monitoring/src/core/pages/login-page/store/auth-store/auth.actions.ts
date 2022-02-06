import { operationActionsFactory } from "src/core/commons/operation/operation.actions";
import { loginCredentails } from "./login-credentails.model";

export const signUpActions = operationActionsFactory<loginCredentails, any>(
    '[auth] sign up'
)

export const signInActions = operationActionsFactory<loginCredentails, any>(
    '[auth] sign in'
)

export const logoutActions = operationActionsFactory<null, null>(
    '[auth] logout'
)

export const resetPassword = operationActionsFactory<string, null>(
    '[auth] reset password'
)