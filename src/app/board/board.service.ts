import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Board } from './board';

@Injectable() //If a class no Component then you have to delclare  @Injectable
export class BoardService
{
    private url="http://localhost:2222";
    constructor(private http: HttpClient){
       
   }
   saveBoard(board: Board)
   {
    return this.http.post(this.url + "/saveBoard", board);
    
    }     
    readBoards(){
        return this.http.get<Board[]>(this.url + "/readBoards");
    }

    deleteBoard(id){
        return this.http.delete(this.url + "/deleteBoard/"+ id);
    }
    readBoard(id){
        return this.http.get<Board>(this.url + "/readBoard/"+ id);
           }
}