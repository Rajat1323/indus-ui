import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { MESSAGES, STATIC_VALUES } from "../utils/helper";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {

    public constructor(private _snackbarContext: MatSnackBar, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this._snackbarContext.open(err.error.message || 'Token Expired', 'Ok', { duration: STATIC_VALUES.snackbarHideDuration, panelClass: ['error-snackbar'] });
                        this.router.navigate(['/auth/sign-in']);
                    }
                    if (err.status === 500) {
                        this._snackbarContext.open(MESSAGES.GENERIC_ERROR, 'Ok', { duration: STATIC_VALUES.snackbarHideDuration, panelClass: ['error-snackbar'] });
                    }
                    if (err.status !== 401 && err.status !== 500) {
                        this._snackbarContext.open(err.error.message || MESSAGES.GENERIC_ERROR, 'Ok', { duration: STATIC_VALUES.snackbarHideDuration, panelClass: ['error-snackbar'] });
                    }
                }
                throw new Error(err);
            })
        );
    }
}