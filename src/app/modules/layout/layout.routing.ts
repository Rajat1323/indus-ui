import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { canActivateRoute } from 'src/app/core/guards/auth.guard';

export const layoutRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    //canActivate: [canActivateRoute],
    children: [],
  },
];
