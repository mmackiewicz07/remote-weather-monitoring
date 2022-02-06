import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { LoginPageComponent } from './login-page/login-page.component';
import { CommonModule } from '@angular/common';
import { featureStoreEnum } from '../app-store/featureStore.enum';
import * as FromAtuh from './login-page/store/auth.reducers'
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './login-page/store/auth-store/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { AuthService } from './login-page/store/auth-store/auth.service';
import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
    declarations: [MainPageComponent, ToolbarComponent, LoginPageComponent, HomeComponent, SidenavComponent, ResetPasswordComponent],
    imports: [RouterModule, SharedModule, ReactiveFormsModule, CommonModule, StoreModule.forFeature(featureStoreEnum.auth, FromAtuh.reducer), EffectsModule.forFeature([AuthEffects])],
    exports: [ToolbarComponent],
    providers: [AuthService]
})

export class PagesModule { }