import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UtilityService {

    public constructor() { }

    toBase64 = (file: File) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    serialize(inputs: any) {
        var str = [];
        for (const p in inputs)
            if (inputs.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(inputs[p]));
            }
        return str.length ? '?' + str.join("&") : '';
    }

    getQueryParameter(key: string): string {
        const parameters = new URLSearchParams(window.location.search);
        return parameters.get(key) || '';
    }

    public groupBy(items: Array<any>, key: string) {
      return items.reduce((r, a) => {
          r[a[key]] = [...r[a[key]] || [], a];
          return r;
      }, {});
  };
}
