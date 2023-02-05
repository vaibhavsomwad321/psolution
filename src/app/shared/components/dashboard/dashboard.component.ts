import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Student } from '../../model/student';
import { ApicallService } from '../../services/apicall.service';
import { jsPDF } from 'jspdf';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  studentArray: Student[] = []
  @ViewChild('content', { static: false }) el!: ElementRef

  constructor(private apiCallService: ApicallService) {

  }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.apiCallService.getAllStudent().subscribe(res => {
      console.log(res)
      this.studentArray = res

    })
  }
  onDelete(id: number) {
    this.apiCallService.deleteStudent(id).subscribe(res => {
      console.log(res);
      this.studentArray = this.studentArray.filter(p => p.id !== id)
    })
  }
  onInputSearch(event: Event) {
    let targetVal = (event.target! as HTMLInputElement).value;
    this.apiCallService.getAllStudent().subscribe(res => {
      this.studentArray = res.filter((ele: any) => {
        return ele.fullname.toLowerCase().includes(targetVal)
      })
    })
  }
  clickDownload() {
    const studentData = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Studend Data',
      useBom: true,
      headers: ["fullName", "Grade", "Gender",
        "PickUpLocation",
        "Contact", "Sr no"],
      useHeader: false,
      nullToEmptyString: true,


    };
    new AngularCsv(this.studentArray, "StudendData", studentData);
  }

  makePdf() {
    let pdf = new jsPDF('p', 'px', 'a3')
    pdf.text('this.studentArray', 10, 10);
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('studentdata.pdf');
      }
    })

  }
}
