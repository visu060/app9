import { Component, OnInit } from '@angular/core';
import { JobTypeService } from '../job-type/job-type.service';
import { LocationService } from '../location/location.service';
import { FormBuilder, FormControl, Validators, FormArray, FormArrayName } from '@angular/forms';
import { JobSeekerService } from './job-seeker.service';
import { formatDate, DatePipe } from '@angular/common';
import { BoardService } from '../board/board.service';


@Component({
  selector: 'job-seeker',
  templateUrl: './job-seeker.component.html',
  styleUrls: ['./job-seeker.component.css']
})
export class JobSeekerComponent implements OnInit {
  jobTypes = [];
  jobSeekers = [];
  locations = [];
  jobSeekerForm;
  boards = [];
  constructor(private formBuilder: FormBuilder,
    private jobTypeService: JobTypeService,
    private locationService: LocationService,
    private service: JobSeekerService,
    private boardService: BoardService,
    private datePipe: DatePipe) {
    this.jobSeekerForm = formBuilder.group({
      id: new FormControl(''),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      gender: new FormControl('unknown'),
      isMarried: new FormControl('unknown'),
      jobType: formBuilder.group({
        id: new FormControl('', Validators.required),
      }),
      profilePicUrl: new FormControl('', Validators.required),
      aadharNo: new FormControl('', Validators.required),
      panNo: new FormControl('', Validators.required),
      currentLocation: formBuilder.group({
        id: new FormControl('', Validators.required),
      }),
      yearsOfExp: new FormControl('', Validators.required),
      profileSummary: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      currentPassword: new FormControl('', Validators.required),
      // location: formBuilder.group({
      //   id:  new FormControl(''),
      // })
      boards: new FormArray([]),
    });
  }

  ngOnInit() {
    this.jobTypeService.readJobTypes().subscribe(
      results => {
        this.jobTypes = results;
      }
    );
    this.locationService.readLocations().subscribe(
      results => {
        this.locations = results;
        
      }
    );
    this.boardService.readBoards().subscribe(
      results =>{
        this.boards = results;
        for(let i = 0;i < this.boards.length; i++)
        {
          (this.jobSeekerForm.get('boards') as FormArray).push(new FormControl());
        }
      }
      
    );
        this.readJobSeekers();
  }
  get id() {
    return this.jobSeekerForm.get('id');
  }
  get firstName() {
    return this.jobSeekerForm.get('firstName');
  }
  get lastName() {
    return this.jobSeekerForm.get('lastName');
  }
  get dob() {
    return this.jobSeekerForm.get('dob');
  }
  get gender() {
    return this.jobSeekerForm.get('gender');
  }
  get isMarried() {
    return this.jobSeekerForm.get('isMarried');
  }
  get jobTypeId() {
    return this.jobSeekerForm.get('jobType').get('id');
  }
  get profilePicUrl() {
    return this.jobSeekerForm.get('profilePicUrl');
  }
  get aadharNo() {
    return this.jobSeekerForm.get('aadharNo');
  }
  get panNo() {
    return this.jobSeekerForm.get('panNo');
  }
  get locationId() {
    return this.jobSeekerForm.get('currentLocation').get('id');
  }
  get yearsOfExp() {
    return this.jobSeekerForm.get('yearsOfExp');
  }
  get profileSummary() {
    return this.jobSeekerForm.get('profileSummary');
  }
  get email() {
    return this.jobSeekerForm.get('email');
  }
  get currentPassword() {
    return this.jobSeekerForm.get('currentPassword');
  }
  get boardId() {
    return this.jobSeekerForm.get('board').get('id');
  }

  saveJobSeeker() {
    var selectedBoardIds = this.jobSeekerForm.value.boards.map((v, i) => v ? this.boards[i].id : null).filter(v => v !== null);
    console.log("selectedBoardIds=====",selectedBoardIds);
    var selectedBoardIdsArray = selectedBoardIds.toString().split(',');
    console.log("selectedBoardIdsArray=====",selectedBoardIdsArray);
    var boardsArray = [];
    for(var i = 0; i < selectedBoardIdsArray.length; i++)
    {
      boardsArray.push({id: selectedBoardIdsArray[i]})
    }
    this.jobSeekerForm.value.board = boardsArray;
    var jsonStr = JSON.stringify(this.jobSeekerForm.value);
    var jsonObj = JSON.parse(jsonStr);
    if (this.jobSeekerForm.invalid) {
      return;
    }
    console.log(this.jobSeekerForm.value);
    this.service.saveJobSeeker(this.jobSeekerForm.value).subscribe(
      results => {
        console.log(results);
        this.jobSeekerForm.reset();
        this.readJobSeekers();
      }
    )
    //alert(JSON.stringify(this.jobSeekerForm.value));
  }
  readJobSeekers() {
    this.service.readJobSeekers().subscribe(
      results => {
        this.jobSeekers = results;
        // for (var i = 0; i < this.jobSeekers.length; i++) {
        //   this.jobSeekers[i].dob = formatDate(this.jobSeekers[i].dob, 'yyyy-MM-dd', 'en')
        // }
        console.log(results);
      }
    )
  }
  readJobSeeker(id) {
    this.service.readJobSeeker(id).subscribe(
      results => {
        var jsonStr = JSON.stringify(results);
        var jsonObj = JSON.parse(jsonStr);
        this.jobSeekerForm.get('id').setValue(jsonObj.id);
        (this.jobSeekerForm.get('boards') as FormArray).clear();
        var flag = false;
        for(let i = 0; i < this.boards.length; i++)
        {
          flag = this.boardAvailability(jsonObj.board, this.boards[i].id);
          (this.jobSeekerForm.get('boards') as FormArray).push(new FormControl(flag));
        }
        // results.dob = formatDate(results.dob, 'yyyy-MM-dd', 'en')
        // results.isMarried = (results.isMarried).toString();
        // let jsonStr = JSON.stringify(results);
        // let jsonObj = JSON.parse(jsonStr);
        this.jobSeekerForm.patchValue(results);
        this.jobSeekerForm.patchValue({
          dob: this.datePipe.transform(results.dob,"yyyy-MM-dd"),
        })
        // let isMarriedValue = JSON.parse(JSON.stringify(this.jobSeekerForm)).isMarried == 1 ? true : false;
        // this.jobSeekerForm.patchValue({
        //   isMarried: isMarriedValue,
        // })

        console.log(results);
      }
    )
  }
  deleteJobSeeker(id) {
    this.service.deleteJobSeeker(id).subscribe(
      results => {
        console.log(results);
        this.readJobSeekers();
      }
    )
  }
  boardAvailability(boards, id)
  {
    var booleanTest = false;
    for(var k = 0; k < boards.length; k++)
    {
      if(boards[k].id == id)
      {
        booleanTest = true;
        break;
      }
    }
    return booleanTest;
  
}

}
