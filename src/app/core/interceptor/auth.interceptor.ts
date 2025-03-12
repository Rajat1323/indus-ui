import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/modules/auth/services/auth.service";

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {

    public constructor(private authContext: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers: any = req.body instanceof FormData ? null : { 'Content-Type': `application/json` };
        if (this.authContext.token) headers = { ...headers, Authorization: `Bearer ${this.authContext.token}` };
        req = req.clone({
            setHeaders: headers
        });

        return next.handle(req);
    }
}