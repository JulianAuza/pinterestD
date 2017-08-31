import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { PinService } from '../pin.service';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-single-pin',
  templateUrl: './single-pin.component.html',
  styleUrls: ['./single-pin.component.css']
})
export class SinglePinComponent implements OnInit {

  pinID;
  pinfo;
  pin;
  creator;

  currentUser;
  addProcess={postid:"",boardid:""}
  boards;
  addPinBoard;
  created=false;
  pins = [];


  constructor(private _pinService: PinService, private _router: Router, private _route: ActivatedRoute, private _boardService:BoardService) { }

  goBack(){
    window.history.back();
  }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.pinID = params['pinID'];
    });
    this.grabPin();
    this._pinService.grabUser().then(currUser => {
      this.currentUser = currUser;
      this.getBoards();
      this._pinService.retrieveUserPins(currUser).then(pins => {
        this.pins = pins.pins;
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  }

  grabPin(){
    this._pinService.retrievePin(this.pinID).then(response => { 
      this.pinfo= response;
      this.pin = this.pinfo.pin;
      this.creator = this.pinfo.user;
    }).catch(err => console.log(err));
  }

  pinAdding(pin){
    this.addPinBoard=pin;
  }
  addToBoard(board,pin){
  this.addProcess.postid=pin
  this.addProcess.boardid=board
  this._boardService.addToBoard(this.addProcess);
  this._router.navigateByUrl('/profile/' + this.currentUser._id + '/boards');
  }
  
  createStatus(){
    this.created=true;
  }


  getBoards(){
    this._boardService.showBoards(this.currentUser)
      .then(data => this.boards = data)
      .catch(err => console.log(err));
  }

}
