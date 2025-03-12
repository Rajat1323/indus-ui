import { Pipe, PipeTransform } from '@angular/core';
import { FormArray } from '@angular/forms';

@Pipe({
    name: 'asFormArray',
    standalone: true
})
export class AsFormArrayPipe implements PipeTransform {
    transform(value: any): FormArray {
        return value as FormArray;
    }
}
