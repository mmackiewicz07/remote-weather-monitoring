import { Injectable } from '@angular/core';
import { delay, from, Observable, of } from 'rxjs';
import { loginCredentails } from './login-credentails.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class AuthService {
  signUp(loginCredentials: loginCredentails | undefined): Observable<any> {
    const login = loginCredentials?.login || '';
    const password = loginCredentials?.password || '';
    return from(
      this.firebaseAuth.createUserWithEmailAndPassword(login, password)
    );
  }

  signIn(loginCredentials: loginCredentails | undefined): Observable<any> {
    const login = loginCredentials?.login || '';
    const password = loginCredentials?.password || '';
    return from(this.firebaseAuth.signInWithEmailAndPassword(login, password));
  }

  logout(): Observable<any> {
    // this.firebaseAuth.signOut()
    return of(true);
  }

  resetPassword(email: string | undefined): Observable<any> {
    return from(this.firebaseAuth.sendPasswordResetEmail(email ?? ''));
  }

  constructor(public firebaseAuth: AngularFireAuth) {}
}
