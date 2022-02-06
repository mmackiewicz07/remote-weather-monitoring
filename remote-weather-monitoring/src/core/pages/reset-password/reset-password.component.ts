import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, Observable, ReplaySubject, takeUntil, } from 'rxjs';
import { AppStoreState } from 'src/core/app-store';
import { authActions } from '../login-page/store/auth-store';
import { resetPasswordStateError, resetPasswordStateSuccess } from '../login-page/store/auth-store/auth.selectors';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  public form!: FormGroup;

  public resetPasswordSuccess$!: Observable<boolean>;

  public resetPasswordError$!: Observable<HttpErrorResponse | undefined>;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private fb: FormBuilder, private store: Store<AppStoreState>, private router: Router) {

  }

  public ngOnInit(): void {
    this.resetPasswordSuccess$ = this.store.pipe(select(resetPasswordStateSuccess));
    this.resetPasswordError$ = this.store.pipe(select(resetPasswordStateError));

    this.createForm();

    this.listenToChangePasswordSuccess();
  }

  public ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public resetPassword(): void {
    this.store.dispatch(authActions.resetPassword.send({ payload: this.form.value.email }));
  }

  public goBackToLoginPage(): void {
    this.router.navigate(['./logowanie'])
  }

  private listenToChangePasswordSuccess(): void {
    this.resetPasswordSuccess$.pipe(filter(success => !!success), takeUntil(this.destroyed$)).subscribe(() => {
      this.router.navigate(['./logowanie']);
    });

  }

  private createForm(): void {
    this.form = this.fb.group({
      email: [null, Validators.required]
    })
  }
}
