import { AbstractControl, ValidatorFn } from '@angular/forms';

// Custom validator function for file type
export function fileTypeValidator(allowedTypes: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const filePath: string = control.value;

    // Check if a file path is providedx
    if (filePath) {
      // Get the file extension
      const fileExtension :any= filePath.split('.').pop()?.toLowerCase();
      console.log(fileExtension, allowedTypes.indexOf("."+fileExtension))
      // Check if the file extension is in the allowed types array
      if (fileExtension && allowedTypes.indexOf("."+fileExtension) == -1) {
        // Return validation error if file type is not allowed
        return { 'invalidFileType': { value: "."+fileExtension } };
      }
    }

    // Return null if validation passes
    return null;
  };
}