import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StateComponent } from './state/state.component';
import { StateService } from './state/state.service';
import { DistrictComponent } from './district/district.component';
import { DistrictService } from './district/district.service';
import { LocationComponent } from './location/location.component';
import { LocationService } from './location/location.service';
import { JobTypeComponent } from './job-type/job-type.component';
import { JobTypeService } from './job-type/job-type.service';
import { JobSeekerComponent } from './job-seeker/job-seeker.component';
import { JobSeekerService } from './job-seeker/job-seeker.service';
import { DatePipe } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { BoardService } from './board/board.service';
import { StudentAddressComponent } from './student-address/student-address.component';
import { FileSelectDirective , FileUploadModule } from 'ng2-file-upload';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AppleComponent } from './apple/apple.component';



@NgModule({
  declarations: [
    AppComponent,
    StateComponent,
    DistrictComponent,
    LocationComponent,
    JobTypeComponent,
    JobSeekerComponent,
    BoardComponent,
    StudentAddressComponent,
    FileUploadComponent,
    
    AppleComponent
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FileUploadModule
  ],
  providers: [StateService, 
              DistrictService, 
              LocationService, 
              JobTypeService,
              JobSeekerService,
              DatePipe,
              BoardService,
              FileSelectDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
