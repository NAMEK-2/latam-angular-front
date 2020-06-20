import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {FormBirthdayModule} from "./form-birthday.module";
import {FormComponent} from "./pages/form/form.component";

const routes: Routes = [
    {
      path: 'birthday/form',
      component: FormComponent,
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class FormBirthdayRoutingModule {}

