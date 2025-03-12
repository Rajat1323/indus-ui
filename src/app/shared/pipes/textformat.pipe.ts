import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatString',
    standalone: true,
    pure: false
})
export class FormatStringPipe implements PipeTransform {

    transform(value: string): string {
        if (!value) return value;

        // Split the string by underscores
        const words = value.split('_');

        // Capitalize the first letter of each word and join them with spaces
        const formattedString = words
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        return formattedString;
    }

}
