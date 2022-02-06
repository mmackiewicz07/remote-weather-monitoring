import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStoreState } from 'src/core/app-store';
import { authActions } from '../../login-page/store/auth-store/index';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Output() public toggleSidenav = new EventEmitter<never>();

  userData!: any;

  constructor(private store: Store<AppStoreState>) { }

  public logout(): void {
    this.store.dispatch(authActions.logoutActions.send());
  }

  public toogleSidenav(): void {
    this.toggleSidenav.emit();
  }

}
