import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Location } from './location';


@Injectable()
export class LocationService
{
    url = "http://localhost:2222";
    constructor(private http: HttpClient)
    {
    }
    
    readLocations()
    {
        return this.http.get<Location[]>(this.url + "/readLocations");
    }
    readLocation(id)
    {
        return this.http.get<Location>(this.url + "/readLocation/" + id);
    }
    
   saveLocation(location: Location)
    {
        return this.http.post(this.url + "/saveLocation", location);
    }
    
    deleteLocation(id)
    {
        return this.http.delete(this.url + "/deleteLocation/" + id);
    }
    
}









