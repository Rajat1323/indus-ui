import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { HttpHelperService } from "src/app/core/services/http-helper.service";
import { APP_KEYS } from "src/app/core/utils/helper";


@Injectable({ providedIn: 'root' })
export class AuthService {

    public constructor(private httpContext: HttpHelperService) { }

    isAuthorised$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    set isAuthorised(value: boolean) {
        this.isAuthorised$.next(value);
    }

    get token() {
        return localStorage.getItem(APP_KEYS.authToken) || '';
    }
    set token(value: string) {
        localStorage.setItem(APP_KEYS.authToken, value);
    }

    get tokenExpiry() {
        return +(localStorage.getItem(APP_KEYS.tokenExpiry) || '');
    }
    set tokenExpiry(value: number) {
        localStorage.setItem(APP_KEYS.tokenExpiry, `${value}`);
    }

    login(params: any) {
        return this.httpContext.post('v1/auth/login', params);
    }

    logout() {
        return this.httpContext.delete('v1/auth/logout')
            .pipe(map(response => {
                localStorage.removeItem(APP_KEYS.authToken);
                localStorage.removeItem(APP_KEYS.tokenExpiry);
                return response;
            }));
    }

    // sendOTP(mobileOrEmail: string) {
    //     return this.httpContext.get(`v1/auth/send/otp/${mobileOrEmail}`);
    // }

    // verifyOTP(otp: string) {
    //     return this.httpContext.get(`v1/auth/verify/otp/${otp}`);
    // }

}