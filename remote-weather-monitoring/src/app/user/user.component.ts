import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppStoreState } from 'src/core/app-store';
import * as moment from 'moment';
import { authActions } from 'src/core/pages/login-page/store/auth-store';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { resetPasswordStateError } from 'src/core/pages/login-page/store/auth-store/auth.selectors';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user!: any;
  public showInput = false;
  public form!: FormGroup;

  public resetPasswordError$!: Observable<HttpErrorResponse | undefined>;


  constructor(private store: Store<AppStoreState>, public fb: FormBuilder) { }

  public get userCreatedAccount(): string {
    return moment(+this.user.createdAt).format('DD.MM.YYYY, hh:mm');
  }

  public get userLastLogIn(): string {
    return moment(+this.user.lastLoginAt).format('DD.MM.YYYY, hh:mm');
  }

  public ngOnInit(): void {
    this.resetPasswordError$ = this.store.pipe(select(resetPasswordStateError));
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }
    this.userForm();
  }

  public changeUserPassword(): void {
    this.store.dispatch(authActions.resetPassword.send({ payload: this.form.value.email }));
  }

  private userForm(): void {
    this.form = this.fb.group({
      email: ''
    })
  }
}
