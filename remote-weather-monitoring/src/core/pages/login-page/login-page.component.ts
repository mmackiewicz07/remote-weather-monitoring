import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, Observable, ReplaySubject, takeUntil } from 'rxjs';
import { AppStoreState } from 'src/core/app-store';
import { authActions } from '../login-page/store/auth-store/index';
import { loginStateError, loginStateLoading, loginStateSuccess, registerStateError, registerStateLoading, registerStateSuccess } from './store/auth-store/auth.selectors';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  public hide = true;

  public form!: FormGroup;

  public loginErrorMessage$!: Observable<HttpErrorResponse | undefined>;

  public loginLoading$!: Observable<boolean>;

  public signUpClicked = false;

  public registerError$!: Observable<HttpErrorResponse | undefined>;

  public registerLoading$!: Observable<boolean>;

  private isLoginSuccess$!: Observable<boolean>;

  private isRegisterSuccess$!: Observable<boolean>;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private fb: FormBuilder, private store: Store<AppStoreState>, private router: Router) {

  }

  public ngOnInit(): void {
    this.createForm();
    this.isLoginSuccess$ = this.store.pipe(select(loginStateSuccess));
    this.loginErrorMessage$ = this.store.pipe(select(loginStateError));
    this.loginLoading$ = this.store.pipe(select(loginStateLoading));

    this.isRegisterSuccess$ = this.store.pipe(select(registerStateSuccess));
    this.registerError$ = this.store.pipe(select(registerStateError));
    this.registerLoading$ = this.store.pipe(select(registerStateLoading));

    this.listenToLoginsuccess();
    this.listenToRegisterSuccess();
  }

  public ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public signUpSwitch(): void {
    this.signUpClicked = !this.signUpClicked;
    ['login', 'password', 'reapeatedPassword'].map(control => {
      if (control === 'reapeatedPassword' && this.signUpClicked) {
        this.form.controls[control].setValidators([Validators.required]);
        this.form.controls[control].updateValueAndValidity();
      } else if (control === 'reapeatedPassword' && this.signUpClicked) {
        this.form.controls[control].setValidators(null);
        this.form.updateValueAndValidity();

      };
      this.form.markAsUntouched();
    })
  }

  public signUp(): void {
    this.store.dispatch(authActions.signUpActions.send({ payload: this.form.value }))
  }

  public signIn(): void {
    this.store.dispatch(authActions.signInActions.send({ payload: this.form.value }))
  }

  public checkLogInValidation(): boolean {
    return !!(!this.form.get('password')?.touched || !this.form.get('login')?.touched || !this.form.get('login')?.valid || !this.form.get('password')?.valid);
  }

  public checkSignUpValidation(): boolean {
    return !!(!this.form.get('password')?.touched || !this.form.get('login')?.touched || !this.form.get('login')?.valid || !this.form.get('password')?.valid || this.form.hasError('notSame'));
  }

  public goToResetPasswordPage(): void {
    this.router.navigate(['./resetowanie-hasla']);
  }

  private createForm(): void {
    this.form = this.fb.group({
      login: [null, Validators.required],
      password: [null, Validators.required],
      reapeatedPassword: null,
    }, { validators: this.checkPasswords })
  }

  private listenToLoginsuccess(): void {
    this.isLoginSuccess$.pipe(filter(success => !!success), takeUntil(this.destroyed$)).subscribe(() => {
      this.router.navigate(['./strona-glowna']);
    });
  }

  private listenToRegisterSuccess(): void {
    this.isRegisterSuccess$.pipe(filter(success => !!success), takeUntil(this.destroyed$)).subscribe(() => {
      this.signUpSwitch();
    });
  }

  private checkPasswords: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
    const pass = form?.get('password')?.value;
    const confirmPass = form?.get('reapeatedPassword')?.value
    return pass === confirmPass ? null : { notSame: true }
  }
}

