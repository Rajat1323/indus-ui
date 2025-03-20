import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { AppHttpResponse } from "../utils/helper";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class HttpHelperService {

    public constructor(private httpContext: HttpClient) { }

    public get(url: string) {
        return this.httpContext.get<AppHttpResponse>(`${environment.apiBaseUrl}/${url}`)
            .pipe(map(response => response as AppHttpResponse));
    }

    public getRaw(url: string) {
        return this.httpContext.get<any>(url)
            .pipe(map(response => response));
    }

    public getBlob(url: string) {
        return this.httpContext.get(`${environment.apiBaseUrl}/${url}`, { responseType: 'blob' });
    }

    public post(url: string, data: any) {
        return this.httpContext.post<AppHttpResponse>(`${environment.apiBaseUrl}/${url}`, data)
            .pipe(map(response => response as AppHttpResponse));

    }

    public put(url: string, data: any) {
        return this.httpContext.put<AppHttpResponse>(`${environment.apiBaseUrl}/${url}`, data)
            .pipe(map(response => response as AppHttpResponse));
    }

    public patch(url: string, data: any = null) {
        return this.httpContext.patch<AppHttpResponse>(`${environment.apiBaseUrl}/${url}`, data)
            .pipe(map(response => response as AppHttpResponse));
    }

    public delete(url: string, data?: any) {
        return this.httpContext.delete(`${environment.apiBaseUrl}/${url}`, { body: data })
            .pipe(map(response => response as AppHttpResponse));
    }

    public postFiles(url: string, data: FormData) {
        return this.httpContext.post<any>(`${environment.apiBaseUrl}/${url}`, data, { observe: 'events', reportProgress: true });
    }

    public putFiles(url: string, data: FormData) {
        return this.httpContext.put<any>(`${environment.apiBaseUrl}/${url}`, data, { observe: 'events', reportProgress: true });
    }
    
    public putMultipleFiles(url: string, data: FormData[]) {
        return this.httpContext.put<any>(`${environment.apiBaseUrl}/${url}`, data, { observe: 'events', reportProgress: true });
    }

}