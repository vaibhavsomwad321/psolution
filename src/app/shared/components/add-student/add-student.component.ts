import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApicallService } from '../../services/apicall.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  studentForm: FormGroup = {} as FormGroup;
  id!: number;
  flag: boolean = true;
  genderArray = ['Male', 'Female', 'Other'];

  constructor(private fb: FormBuilder, private apiCallService: ApicallService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
    this.onEdit()
  }
  createForm() {
    this.studentForm = this.fb.group({
      fullname: [null, Validators.required],
      grade: [null, Validators.required],
      gender: ['',],
      pickUpLocation: [null, Validators.required],
      contact: [null, []],
    })
  }
  onSubmit() {
    let obj = {
      ...this.studentForm.value
    }
    this.apiCallService.addStudent(obj).subscribe(res => {
      console.log(res);
      this.router.navigate(['/'])
      this.studentForm.reset()
    })

  }
  onEdit() {
    this.route.params.subscribe((myParams: Params) => {
      this.id = +myParams['id']
      this.apiCallService.getSingalStudent(this.id).subscribe((res: any) => {
        this.studentForm.setValue({
          fullname: res.fullname,
          grade: res.grade,
          gender: res.gender,
          pickUpLocation: res.pickUpLocation,
          contact: res.contact,
        })
        this.flag = false

      })
    })

  }
  onUpdate() {
    let obj = {
      ...this.studentForm.value
    }
    this.apiCallService.updateStudent(this.id, obj).subscribe(res => {
      this.router.navigate(['/'])
    })
  }
}
