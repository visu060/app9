import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { District } from './district';


@Injectable()
export class DistrictService
{
    url = "http://localhost:2222";

    constructor(private http: HttpClient)
    {

    }
    readDistricts()
    {
        return this.http.get<District[]>(this.url + "/readDistricts");
    }
    readDistrict(id)
    {
        return this.http.get<District>(this.url + "/readDistrict/" + id);
    }
    saveDistrict(district: District)
    {
        return this.http.post(this.url + "/saveDistrict", district);
    }
    deleteDistrict(id)
    {
        return this.http.delete(this.url + "/deleteDistrict/" + id);
    }
    readDistrictsInOneState(stateId)
    {
        return this.http.get<District[]>(this.url + "/readDistrictsInOneState/" + stateId);
    }
}