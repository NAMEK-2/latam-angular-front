import {NgModule} from '@angular/core';
import {FormComponent} from './pages/form/form.component';
import {FormBirthdayRoutingModule} from './form-birthday-routing.module';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
      FormComponent,
    ],
  imports: [
    FormBirthdayRoutingModule,
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class FormBirthdayModule {

}
