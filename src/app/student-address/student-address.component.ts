import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

class Student
{
  id;
  firstName;
  lastName;
  gender;
  education;
  address:{
    id;
    houseNo;
    streetName;
    city;
    state;
    student;
  }
}

class Address{
  id;
  houseNo;
  streetName;
  city;
  state;
  student:{
    id;
    firstName;
    lastName;
    gender;
    education;
  }
}

//DTO

class AddressDTO
{
  id;
  hoseNo;
  streetName;
  city;
  state;
  studentId
}

@Component({
  selector: 'app-student-address',
  template: `
    <p>
      student-address works!
    </p>
  `,
  styles: []
})
export class StudentAddressComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Student>('http://localhost:7860/readStudent/1').subscribe(
      r1 =>{
        console.log(r1);
      }
    )
    this.http.get<Address>('http://localhost:7860/readAddress/1').subscribe(
      r1 =>{
        console.log(r1);
      }
    )
    this.http.get<AddressDTO>('http://localhost:7860/readAddressOnly/1').subscribe(
      r1 => {
        console.log(r1);
      }
    )
  }

}
