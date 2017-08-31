import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Board } from "../board";
import { PinService } from '../pin.service';
import { BoardService } from '../board.service';


@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {
  _router: any;
  boards;
  boardid={content:""}
  constructor(private _pinService:PinService,private _boardService:BoardService, private _route: ActivatedRoute){}
  boardView=false
  board=new Board()
  createNew=true
  viewing;
  pins = [];
  currentUser;
  paramsID;
  myAccount = true;
  boardOwner = this._pinService.viewedUser;

  
  newBoard(){
    this.board._userid=this.currentUser._id

    this._boardService.addBoard(this.board)
    // .then(response => {
    //   this._router.navigateByUrl('/profile/boards');
    // }).catch(err => console.log(err));

    this.createNew=false
  }

  createNewStatus(){
    this.createNew=true
  }
  
  // grabBoards(){
  //   this._boardService.showBoards(this.boardOwner)
  //   .then(data => this.boards = data)
  //   .catch(err => console.log(err));
  // }

  delete(id){
    this.boardid.content=id
    this._boardService.deleteBoard(this.boardid, this.currentUser);
  }

  display(board){
    this.boardView=true
    this.viewing=board
  }

  allBoards(){
    this.boardView=false;
    this._boardService.showBoards(this.boardOwner)
    .then(data => this.boards = data)
    .catch(err => console.log(err));
  }

  ngOnInit() {
  this._pinService.grabUser().then(currUser => this.currentUser = currUser).catch(err => console.log(err));
  this._boardService.showBoards(this.boardOwner)
    .then(data => this.boards = data)
    .catch(err => console.log(err));
  this.populatePins(); 
  this.myAccount = (this._pinService.loggedUser._id == this._pinService.viewedUser._id);
  }

  populatePins(){
      this._pinService.retrievePins().then(pins => this.pins = pins).catch(err => console.log(err));
  }

  removePin(pin, board){
    console.log("clicked remove pin");
    this._pinService.removePin(pin, board).then(pins => {
      console.log(pins);
      this._pinService.grabmyBoard(board).then(board => this.viewing = board).catch(err => console.log(err));
    }).catch(err => console.log(err));
    // this.populatePins();
    // this.ngOnInit();
    // this._router.navigateByUrl('/profile/' + this.currentUser._id + '/boards');
    // this._pinService.grabmyBoard(board).then(board => this.viewing = board).catch(err => console.log(err));
  }

}
