import { Component, OnInit } from '@angular/core';
import { StateService } from '../state/state.service';
import { DistrictService } from '../district/district.service';
import { LocationService } from './location.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  states = [];
  districts = [];
  locations = [];
  locationForm;
  constructor(private stateService: StateService,
              private districtService: DistrictService,
              private locationService: LocationService,
              private formBuilder: FormBuilder) { 
    this.locationForm = formBuilder.group({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      locationDesc: new FormControl('', Validators.required),
      district: this.formBuilder.group({
        id: new FormControl(''),
        state: this.formBuilder.group({
          id: new FormControl('')
        })
      })
    });
    this.readLocations();
  }

  ngOnInit() {
    this.readStates();
  }
  readStates()
  {
    this.stateService.readStates().subscribe(
      results =>{
        this.states = results;
      }
    )
  }
  populateDistricts(state)
  {
    this.districtService.readDistrictsInOneState(state).subscribe(
      results =>{
        this.districts = results;
      }
    )
  }
  get name()
  {
    return this.locationForm.get('name');
  }

  get locationDesc()
  {
    return this.locationForm.get('locationDesc');
  }
  get id()
  {
    return this.locationForm.get('district').get('id');
  }
  saveLocation()
  {
    this.locationService.saveLocation(this.locationForm.value).subscribe(
      results =>{
        this.locationForm.reset();
        console.log(results);        
        this.readLocations();     
      }
    )
  }



  getCurrentDistrictIdValue()
  {
    return JSON.stringify(this.locationForm.get("district").get("id").value);
  }

  readLocations()
  {
      this.locationService.readLocations().subscribe(
        results => {
          this.locations = results;          
        }
      )
  }
  readLocation(id)
  {
      this.locationService.readLocation(id).subscribe(
        results =>{
          this.locationForm.patchValue(results);
        });
  }
  
  deleteLocation(id)
  {
      this.locationService.deleteLocation(id).subscribe(
        results =>{
          console.log(results); 
          this.readLocations();         
        }
      );
  }


}




