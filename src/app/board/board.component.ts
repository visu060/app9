import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BoardService } from './board.service';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  boardForm;
  boards =[];
  
  constructor(private formBuilder:FormBuilder, private boardService:BoardService)
   {
    this.boardForm =formBuilder.group({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      boardDesc: new FormControl('', Validators.required)
      
      })
   
  
  }

  ngOnInit() {

    this.readBoards();
  }
  get id()
  {
    return this.boardForm.get('board').get('id');
  }
  get name(){
     return this.boardForm.get('name');
  }
  get boardDesc(){
    return this.boardForm.get('boardDesc');
  }
  

  saveBoard(){
    if(this.boardForm.invalid){
      this.name.toched = true;
      this.boardDesc.touched = true;
      return false;
    }
    this.boardService.saveBoard(this.boardForm.value).subscribe(
      results =>{
        console.log(results);
        this.boardForm.reset();
        this.readBoards();
      }
    )
  }
  readBoards(){
    this.boardService.readBoards().subscribe(
      results =>{
                  this.boards =results;
                  console.log(this.boards);
              } )
            }
  deleteBoard(id){
       this.boardService.deleteBoard(id).subscribe(
          results =>{
            console.log(results);
              this.readBoards();
                 }
               )
            }

  readBoard(id){
      this.boardService.readBoard(id).subscribe(
        results =>{
            this.boardForm.patchValue(results);
            console.log(results);
            }
          )
         }   
}
