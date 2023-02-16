import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: AddEmployeeComponent
  }
]
@NgModule({
  declarations: [
    AddEmployeeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class EmployeeModule { }
