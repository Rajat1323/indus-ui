import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "src/environments/environment";

@Pipe({ name: 'filePathResolver', standalone: true })
export class FilePathResolverPipe implements PipeTransform {

    transform(relativePath: string, ...args: any[]) {

        // relativePath = !relativePath ? "../storage/uploads/avatar.png" : relativePath;
        return `${environment.apiBaseUrl}/${relativePath}`;

    }

}