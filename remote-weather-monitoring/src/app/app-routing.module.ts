import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/core/pages/home/home.component';
import { LoginPageComponent } from 'src/core/pages/login-page/login-page.component';
import { MainPageComponent } from 'src/core/pages/main-page/main-page.component';
import { ResetPasswordComponent } from 'src/core/pages/reset-password/reset-password.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import { AuthGuard } from './services/auth.guard';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [{
      path: '',
      redirectTo: 'logowanie',
      pathMatch: 'full'
    },
    {
      path: 'logowanie',
      component: LoginPageComponent,
    },
    {
      path: 'resetowanie-hasla',
      component: ResetPasswordComponent,
    },
    ]
  },
  {
    path: 'strona-glowna',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [{
      path: 'uzytkownik',
      component: UserComponent,
    },
    {
      path: 'pomiary',
      component: MeasurementsComponent,
    }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
