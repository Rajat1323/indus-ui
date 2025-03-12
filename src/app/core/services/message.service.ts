import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class MessageService {

    public constructor() {}

    // private message$: Record<string, Subject<any>> = {key: '', message: new Subject()};

    // podcast<T>(message: T, messageKey: string) {
    //     this.message$[messageKey].next(message);
    // }

    // listen(key: string) {
    //     return this.message$[key];
    // }
}