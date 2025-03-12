import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/layout/layout.routing').then((m) => m.layoutRoutes),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routing').then((m) => m.authRoutes),
  },
  {
    path: 'errors',
    loadChildren: () => import('./modules/error/error.routing').then((m) => m.errorRoutes),
  },
  { path: '**', redirectTo: 'errors/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
