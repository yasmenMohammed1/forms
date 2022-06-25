import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { NotReachedScreenGuard } from './Gaurds/not-reached-screen.guard';

const routes: Routes = [
  {
    path: 'userprofile',
    loadChildren: () =>
      import('./user-profile/user-profile.module').then(
        (m) => m.UserProfileModule
      ),
    canActivate: [NotReachedScreenGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./sign-up/sign-up.module').then((m) => m.SignUpModule),
    canActivate: [NotReachedScreenGuard],
  },
  {
    path: 'confirm',
    loadChildren: () =>
      import('./confirmation/confirmation.module').then(
        (m) => m.ConfirmationModule
      ),
  },
  { path: '', redirectTo: 'register', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(public router: Router) {}
}
