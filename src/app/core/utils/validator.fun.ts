import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass: string = group.get('password')?.value;
    let confirmPass: string = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { passwordNotMatched: true };
};

/**
 * @param group FormGroup
 * @param validationMessages Error object
 * @returns errors object
 */
export const getValidationErrors = (group: FormGroup, validationMessages: any) => {
    var formErrors: any = {};

    Object.keys(group.controls).forEach((key: string) => {
        const abstractControl = group.get(key);

        formErrors[key] = '';
        if (abstractControl && !abstractControl.valid &&
            (abstractControl.touched || abstractControl.dirty)) {

            const messages = validationMessages[key];

            for (const errorKey in abstractControl.errors) {
                if (errorKey) {
                    formErrors[key] = messages[errorKey] + ' ';
                }
            }
        }

        if (abstractControl instanceof FormGroup) {
            let groupError = getValidationErrors(abstractControl, validationMessages);
            formErrors = { ...formErrors, ...groupError }
        }
    });
    return formErrors
}
