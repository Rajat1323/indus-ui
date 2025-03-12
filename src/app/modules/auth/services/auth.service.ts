import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { HttpHelperService } from "src/app/core/services/http-helper.service";
import { deleteCookie, getCookie } from "src/app/core/utils/cookie-utility";
import { APP_KEYS } from "src/app/core/utils/helper";
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthService {

    public constructor(private readonly httpContext: HttpHelperService, private readonly router: Router) { }

    public isAuthorised$: BehaviorSubject<boolean> = new BehaviorSubject(false);


    public isAuthenticated(): boolean {
        return getCookie(APP_KEYS.authToken) ? true : false;
    }


    public login(params: any) {
        return this.httpContext.post('v1/auth/login', params);
    }

    public logout() {
        return this.httpContext.delete('v1/auth/logout')
            .subscribe((response: any) => {
                if (response.data) {
                    deleteCookie(APP_KEYS.authToken);
                    this.router.navigate(['/']);
                }
            });
    }
}