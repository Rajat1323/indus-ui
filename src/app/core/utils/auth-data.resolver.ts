import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from "@angular/router";
import { IUser, IUserDetails } from "src/app/modules/user-management/models/user.model";
import { UserService } from "src/app/modules/user-management/services/user.service";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";
import { STATIC_VALUES } from "./helper";

@Injectable({ providedIn: 'root' })
export class AuthDataResolver {
    constructor(private userService: UserService, private _snackbarContext: MatSnackBar, private router: Router) { }

    resolve(): Observable<IUserDetails | null> {
        return this.userService.fetchCurrentUser().pipe(
            map(user => {
                if (user.userType === 'app') {
                    this._snackbarContext.open('You are not authorized to access this page', 'Ok', { duration: STATIC_VALUES.snackbarHideDuration, panelClass: ['error-snackbar'] });
                    this.router.navigate(['/auth']);
                    return null; // Returning null to prevent further processing
                } else if (user.isActive === false) {
                    this._snackbarContext.open('Your account has been deactivated', 'Ok', { duration: STATIC_VALUES.snackbarHideDuration, panelClass: ['error-snackbar'] });
                    this.router.navigate(['/auth']);
                    return null;
                }
                return user;
            }),
            catchError(() => {
                this.router.navigate(['/auth']);
                return of(null); // Handling errors and navigating to '/auth'
            })
        );
    }
}

export const loggedInUserResolver: ResolveFn<IUser | null> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AuthDataResolver).resolve();
};
