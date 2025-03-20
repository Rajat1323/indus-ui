import { Injectable } from "@angular/core";
import { HttpHelperService } from "src/app/core/services/http-helper.service";
import { UtilityService } from "src/app/core/services/utility.service";
import { map, Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TestService {

  constructor(private _httpContext: HttpHelperService, public utilityContext: UtilityService) { }

  getWelcomeMessage() {
    return this._httpContext.get(`sample`).pipe(
      map(response => response.data)
    );
  }

}
