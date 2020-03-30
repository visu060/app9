import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl } from '@angular/forms';

class Apple
{
  id;
  firstName;
  lastName;

}

@Component({
  selector: 'app-apple',
  template: `


  <form [formGroup]="appleForm" (ngSubmit)="onSubmit()">

  firstName: <input type="text" formControlName="firstName"/>
  <span *ngIf="firstName.touched && firstName.invalid">
  firstName is required one 
  </span> <br/>

  lastName: <input type="text" formControlName="lastName"/>
  <span *ngIf="lastName.touched && lastName.invalid">
  lastName is required one 
  </span> <br/>
  
  <input type="submit" value="submit"/>
</form>
  `,
  styles: []
})
export class AppleComponent implements OnInit {
  appleForm;
  http:HttpClient;


  constructor(private formBuilder : FormBuilder, http:HttpClient) {
    this.appleForm = this.formBuilder.group({
      id: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl('')
    })
   }

  ngOnInit() {
   
  }
  get firstName()
  {
    return this.appleForm.get('firstName');
  }

  get lastName()
  {
    return this.appleForm.get('lastName');
  }

  onSubmit()
  {
    let jsonStr = JSON.stringify(this.appleForm.value);
   // alert(jsonStr);
    let jsonObj = JSON.parse(jsonStr);
    this.http.post('http://localhost:6666/save', jsonObj).subscribe(
      results =>
      {
        console.log(results) ;
      
        
      }

      )
  }
  
}
