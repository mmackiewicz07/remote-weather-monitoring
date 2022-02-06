import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { AppStoreState } from 'src/core/app-store';
import { loginStateSuccess } from "src/core/pages/login-page/store/auth-store/auth.selectors";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<AppStoreState>, private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        const isUserInLocalStorage = !!localStorage.getItem('user');

        console.log('isUserInLocalStorage', isUserInLocalStorage);

        if (!isUserInLocalStorage) {
            this.router.navigate(['./logowanie'])
        }

        return isUserInLocalStorage;

    }

}