import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobSeeker } from './jobseeker';


@Injectable()
export class JobSeekerService{

    private url="http://localhost:2222";

    constructor(private http:HttpClient){

    }

    saveJobSeeker(jobseeker: JobSeeker)
    {
        return this.http.post(this.url + "/saveJobSeeker", jobseeker);
    }

    readJobSeekers()
    {     
        return this.http.get<JobSeeker[]>(this.url + "/readJobSeekers");
    }

    deleteJobSeeker(id)
    {
        return this.http.delete(this.url + "/deleteJobSeeker/" + id)
    }
    readJobSeeker(id)
    {
        return this.http.get<JobSeeker>(this.url + "/readJobSeeker/" + id);
    }
    

}