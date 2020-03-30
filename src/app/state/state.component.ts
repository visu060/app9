import { Component, OnInit } from '@angular/core';
import { StateService } from './state.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  states = [];
  stateForm;
  constructor(private formBuilder: FormBuilder, private service: StateService) { }

  ngOnInit() {
    this.readStates();
    this.stateForm = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      stateDesc: new FormControl('', Validators.required)
    })
  }

  get name()
  {
    return this.stateForm.get("name");
  }

  get stateDesc()
  {
    return this.stateForm.get("stateDesc");
  }


  readStates()
  {
      this.service.readStates().subscribe(
        r1 =>{
          console.log(r1);
          this.states = r1;
        }
      )
  }
  readState(id)
  {
      this.service.readState(id).subscribe(
        r1 =>{
            this.stateForm.setValue(r1);
        }
      )
  }
  saveState()
  {
      if(this.stateForm.invalid)
      {
        alert("Please fill the form");
        return false;
      }
      this.service.saveState(this.stateForm.value).subscribe(
        results =>
        {
          console.log(results); 
          this.stateForm.reset();
          this.readStates();         
        }
      )
  }
  deleteState(id)
  {
      this.service.deleteState(id).subscribe(
        results => {
          console.log(results);
          this.readStates();
        }
      );
  }

}
