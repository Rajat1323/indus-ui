import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class NonAuthInterceptor implements HttpInterceptor {

    public constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: { 'Content-Type': `application/json` }
        });

        return next.handle(req);

    }
}