import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './shared/components/add-student/add-student.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path:'', redirectTo:'dashboard',pathMatch:'full'
  },
  {
    path:'dashboard', component:DashboardComponent
  },
  {
    path:'addstudent', component:AddStudentComponent
  },
  {
    path:'addstudent/:id', component:AddStudentComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
