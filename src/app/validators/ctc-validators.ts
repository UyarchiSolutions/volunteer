import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function atLeastOneRequired(control: any): { [key: string]: boolean } | null {
  const lacs = control.get('lacs').value;
  const thousand = control.get('thousand').value;

  if (!lacs && !thousand) {
    return { 'atLeastOneRequired': true };
  }

  return null;
}