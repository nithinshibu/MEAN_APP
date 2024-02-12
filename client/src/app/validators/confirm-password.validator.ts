import { FormGroup } from '@angular/forms';

export const confirmPasswordValidator = (
  controlName: string,
  controlNameToMatch: string
) => {
  return (formGroup: FormGroup) => {
    let control = formGroup.controls[controlName];
    let controlToMatch = formGroup.controls[controlNameToMatch];
    // * If controlToMatch have any errors or if it doesn't have the custom validation error of confirm password
    if (
      controlToMatch.errors &&
      !controlToMatch.errors['confirmPasswordValidator']
    ) {
      return;
    }

    if (control.value !== controlToMatch.value) {
      controlToMatch.setErrors({ confirmPasswordValidator: true });
    } else {
      controlToMatch.setErrors(null);
    }
  };
};
