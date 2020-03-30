import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobType } from './job-type';

@Injectable() //If a class no Component then you have to delclare  @Injectable
export class JobTypeService
{
    private url="http://localhost:2222"
    constructor(private http:HttpClient){
       
   }
   saveJobType(jobType:JobType)
   {
    return this.http.post(this.url + "/saveJobType", jobType);
    
    }     
    readJobTypes(){
        return this.http.get<JobType[]>(this.url +"/readJobTypes");
    }

    deleteJobType(id){
        return this.http.delete(this.url +"/deleteJobType/"+id);
    }
    readJobType(id){
        return this.http.get<JobType>(this.url +"/readJobType/"+id);
           }
}