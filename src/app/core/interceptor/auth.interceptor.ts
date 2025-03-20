import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { getCookie } from "../utils/cookie-utility";
import { APP_KEYS } from "../utils/helper";
const getTokenFromCookie = (): string | null => {
    return getCookie(APP_KEYS.authToken);
}

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {

    public constructor(private authContext: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers: any = req.body instanceof FormData ? null : { 'Content-Type': `application/json` };
        if (getTokenFromCookie()) headers = { ...headers, Authorization: `Bearer ${getTokenFromCookie()}` };
        req = req.clone({
            setHeaders: headers
        });

        return next.handle(req);
    }
}