import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { State } from './state';


@Injectable()
export class StateService
{
    url = "http://localhost:2222";
    constructor(private http: HttpClient)
    {
    }
    readStates()
    {
        return this.http.get<State[]>(this.url + "/readStates");
    }
    readState(id)
    {
        return this.http.get<State>(this.url + "/readState/" + id);
    }
    saveState(state: State)
    {
        return this.http.post(this.url + "/saveState", state);
    }
    deleteState(id)
    {
        return this.http.delete(this.url + "/deleteState/" + id);
    }
}









