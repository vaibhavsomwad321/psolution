import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {
  baseUrl = environment.baseUrl;
  constructor(private _http:HttpClient) { }
  
  getAllStudent():Observable<Student[]>{
    return this._http.get<Student[]>(this.baseUrl);
  }
  addStudent(obj:Student):Observable<Student>{
    return this._http.post<Student>(this.baseUrl,obj)
  }
  getSingalStudent(id:number){
    let singalObjUrl = `${this.baseUrl}/${id}`
    return this._http.get(singalObjUrl)
  }
  updateStudent(id:number, obj:Student){
    let updatObjUrl = `${this.baseUrl}/${id}`
    return this._http.patch(updatObjUrl,obj)
  }
  deleteStudent(id:number){
    let deleteUrl = `${this.baseUrl}/${id}`
    return this._http.delete(deleteUrl)
  }
}
