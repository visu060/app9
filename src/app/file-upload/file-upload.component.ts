import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl } from '@angular/forms';

const URL = "http://localhost:5555/saveProfilePic";

@Component({
  selector: 'app-file-upload',
  template: `
  <form [formGroup]="myForm" (ngSubmit)="save()">
  
  First Name: <input type="text" formControlName="firstName"/> <br/>
  Last Name: <input type="text" formControlName="lastName"/> <br/>
  Profile Pic:
  <input type="file" name="profilePic" ng2FileSelect [uploader] = "uploader"/>
  <button (click)="saveProfilePic($event)">Upload</button> <br/>
  <input type="submit" value="submit"/>
  </form>
 
  `,
  styles: []
})
export class FileUploadComponent implements OnInit {
  myForm;
  
  public uploader: FileUploader =
            new FileUploader({ url: URL, itemAlias: 'profilePic'});
           // public uploader: FileUploader ;
  constructor(private http: HttpClient, private fb: FormBuilder) { }  
  ngOnInit() {
   // this.uploader=new FileUploader({ url: URL, itemAlias: 'profilePic'});
    this.myForm = this.fb.group({
      id: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
    });    
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false;};
    this.uploader.onCompleteItem = (item: any, response: any,
                                    status: any, headers: any) =>{
         console.log('FILE:uploaded:', item, status, response);
         alert(response)
         //this.myForm.get("id").value = response;
         this.myForm.get("id").setValue(parseInt(response));
        // alert( this.myForm.get("id").value)
    }
  };
saveProfilePic($event){
  //alert(this.uploader.uploadAll())
  this.uploader.uploadAll();
  $event.preventDefault();
  alert(2)
}

save(){
  this.http.post('http://localhost:5555/saveJobSeeker',this.myForm.value).subscribe(
    r1 =>{
      console.log(r1);
    },
    e1 =>{
      console.log(e1);                
    }
  )
}


}