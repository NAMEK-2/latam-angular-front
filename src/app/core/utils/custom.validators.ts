import {FormControl} from '@angular/forms';

export class CustomValidators {

  static notBlank(control: FormControl) {
    const empty = (control.value || '').trim().length === 0;
    return !empty ? null : {
      notBlank: {
        valid: false
      }
    };
  }

};
