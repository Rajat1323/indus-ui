import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  canActivate(route: ActivatedRouteSnapshot, authContext: AuthService, router: Router): boolean {
    const token = route.queryParamMap.get('token');

    if (token) {
      authContext.token = token; // Set the token in AuthService
      return true;
    }

    if (authContext.token) return true;

    router.navigate(['/auth']);
    return false;
  }
}

// Define the standalone `CanActivateFn`
export const canActivateRoute: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authGuard = inject(AuthGuard); // Inject the AuthGuard service
  const authContext = inject(AuthService); // Inject the AuthService
  const router = inject(Router); // Inject the Router
  return authGuard.canActivate(route, authContext, router); // Pass the `route` argument directly
};
