import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function samePasswordValidator(otherControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const notSame = control.value !== otherControl.value;
    return notSame ? { notSamePassword: { value: 'Passwords must be match' } } : null;
  };
}
