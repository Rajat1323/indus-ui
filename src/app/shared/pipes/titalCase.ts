import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
  name: 'titleCase2', standalone: true 
})
export class TitleCasePipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^[a-z]/, (firstLetter) => firstLetter.toUpperCase());
  }
}

// @Pipe({
//   name: 'formatString'
// })
// export class FormatStringPipe implements PipeTransform {
//   transform(value: string): string {
//     const formattedString = value.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^[a-z]/, (firstLetter) => firstLetter.toUpperCase());
//     return formattedString.replace('Date Time', 'Date/Time');
//   }
// }
