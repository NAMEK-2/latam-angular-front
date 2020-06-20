import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../core/services/user.service';
import {SendDataDto} from '../../../../core/dto/send-data.dto';
import {StandardResponseDto} from '../../../../core/dto/standar-response.dto';
import {DatePipe} from '@angular/common';
import {CustomValidators} from '../../../../core/utils/custom.validators';
import {UserDataDto} from '../../../../core/dto/user-data.dto';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {

    public birthdayForm: FormGroup;
    public pipe: DatePipe = new DatePipe('en-US');
    public formSubmitted = false;
    public date = this.pipe.transform(new Date(), 'yyyy-MM-dd');
    public userDto: UserDataDto = null;
    public errorDiv = false;

    public birthdayDto: SendDataDto = {
      name: '',
      lastName: '',
      birthdate: '',
    };

    public loadingButton = false;
    public step = 1;

    constructor(
      private formBuilder: FormBuilder,
      private userService: UserService,
    ) {
    }

    ngOnInit() {
      const dto = this.birthdayDto;
      this.birthdayForm = this.formBuilder.group({
        name: [
          dto.name, Validators.compose([
            Validators.required,
            CustomValidators.notBlank,
          ]),
        ],
        lastName: [
          dto.lastName, Validators.compose([
            Validators.required,
            CustomValidators.notBlank,
          ]),
        ],
        birthdate: [
          dto.birthdate, Validators.compose([
            Validators.required,
            CustomValidators.notBlank,
          ])
        ]
      });
    }

    public get form() { return this.birthdayForm.controls; }

    async seeBirthDate() {
      if (await this.sendDate()) {
        this.step = 2;
      }
    }

    back() {
      this.birthdayForm.controls.birthdate.setValue('');
      this.birthdayForm.controls.name.setValue('');
      this.birthdayForm.controls.lastName.setValue('');
      this.formSubmitted = false;
      this.step = 1;
    }

    async sendDate() {
      this.loadingButton = true;
      this.formSubmitted = true;

      if (!this.validData()) {
        return false;
      }

      await this.workData();
      let resp: StandardResponseDto;

      try {
        resp = await this.userService.seeBirthDayUser(this.birthdayDto).toPromise();
      } catch (e) {
        this.errorDiv = true;
        setTimeout(() => { this.errorDiv = false; }, 3000);
        this.loadingButton = false;
        this.formSubmitted = false;
        return false;
      }

      if (resp.status !== undefined && resp.status) {
        this.userDto = resp.data;
        return true;
      } else {
        this.errorDiv = true;
        setTimeout(() => { this.errorDiv = false; }, 3000);
        this.loadingButton = false;
        this.formSubmitted = false;
        return false;
      }
    }

    validData(): boolean {
      if (!this.birthdayForm.valid) {
        setTimeout(() => { this.loadingButton = false; }, 300);
        return false;
      } else {
        return true;
      }
    }

    workData(): void {
      this.pipe = new DatePipe('en-US');
      const date = this.pipe.transform(this.birthdayForm.controls.birthdate.value, 'dd-MM-yyyy');
      const oneName = this.birthdayForm.controls.name.value.trim().split(' ')[0];
      const oneLastName = this.birthdayForm.controls.lastName.value.trim().split(' ')[0];

      this.birthdayDto = {
        name: oneName,
        lastName: oneLastName,
        birthdate: date,
      };
    }
}
