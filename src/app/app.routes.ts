import { Routes } from '@angular/router';

import { HomeComponent } from './shared/home/home.component';
import { InactiveComponent } from './shared/inactive/inactive.component';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';
import { LoginComponent } from './shared/login/login.component';
import { UserListComponent } from './admin/features/users/user-list/user-list.component';
import { authGuard } from './core/guard/auth.guard';
import { RegisterComponent } from './admin/features/users/register/register.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { activeGuard } from './core/guard/active.guard';
import { adminGuard } from './core/guard/admin.guard';
import { UserEditComponent } from './admin/features/users/user-edit/user-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard, activeGuard],
      },
      {
        path: 'users',
        component: UserListComponent,
        canActivate: [authGuard, activeGuard, adminGuard],
      },
      {
        path: 'users/edit/:id',
        component: UserEditComponent,
        canActivate: [authGuard, activeGuard, adminGuard],
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [authGuard, activeGuard, adminGuard],
      },
      { path: 'inactive', component: InactiveComponent },
      { path: 'unauthorized', component: UnauthorizedComponent },
    ],
  },
];
