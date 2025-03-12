import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { setCookie } from '../utils/cookie-utility';
import { APP_KEYS } from '../utils/helper';
import { getQueryStringValue, removeQueryString } from '../utils/utility.func';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  canActivate(route: ActivatedRouteSnapshot, authContext: AuthService, router: Router): boolean {
   
    if (getQueryStringValue('token')) {
      setCookie(APP_KEYS.authToken, getQueryStringValue('token'));
      removeQueryString();
    }

    if (authContext.isAuthenticated()) {
      return true;
    }

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
