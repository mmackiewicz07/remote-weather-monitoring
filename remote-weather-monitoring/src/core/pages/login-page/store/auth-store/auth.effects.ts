import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { AppStoreState } from "src/core/app-store";
import { AuthService } from "./auth.service";
import { authActions } from './index';

@Injectable()
export class AuthEffects {
    signUp$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.signUpActions.send),
            exhaustMap((action) => this.service.signUp(action.payload).pipe(
                map((res) => authActions.signUpActions.success({ res })),
                catchError((error) => of(authActions.signUpActions.fail({ error })))
            ))
        ));

    signIn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.signInActions.send),
            exhaustMap((action) => this.service.signIn(action.payload).pipe(
                map((res) => {
                    localStorage.setItem('user', JSON.stringify(res.user))
                    return authActions.signInActions.success({ res })
                }
                ),
                catchError((error) => of(authActions.signInActions.fail({ error })))
            ))
        ));

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.logoutActions.send),
            exhaustMap(() => this.service.logout().pipe(
                map((res) => {
                    localStorage.removeItem('user');
                    this.store.dispatch(authActions.signInActions.clear());
                    this.store.dispatch(authActions.signUpActions.clear());
                    this.router.navigate(['./logowanie'])
                    return authActions.logoutActions.success({ res });
                }),
                catchError((error) => of(authActions.logoutActions.fail({ error })))
            ))
        ));

    resetPassword$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.resetPassword.send),
            exhaustMap((action) => this.service.resetPassword(action?.payload).pipe(
                map((res) => {
                    this._snackBar.open('We send you an email with password reset link', 'OK', { duration: 4000 })
                    return authActions.resetPassword.success({ res });
                }),
                catchError((error) => of(authActions.resetPassword.fail({ error })))
            ))
        ));

    constructor(private actions$: Actions, private service: AuthService, private store: Store<AppStoreState>, private router: Router, private _snackBar: MatSnackBar) { }
}