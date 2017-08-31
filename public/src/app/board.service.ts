import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BoardService {

  constructor(private _http: Http) { }

  addBoardWithPin(newBoard){
    return this._http.post('/addBoardWithPin',newBoard)
    .map(data => data.json())
    .toPromise();
  }

  addBoard(board){
    return this._http.post('/newBoard',board)
    .map(data => data.json())
    .toPromise();
  }
  showBoards(boardOwner){
    return this._http.post('/showBoards', boardOwner)
    .map(data => data.json())
    .toPromise();
  }
  deleteBoard(boardid, userid){
    var context = {
      board: boardid,
      user: userid._id
    }
    return this._http.post('/deleteBoard', context)
    .map(data => data.json())
    .toPromise();
  }
  addToBoard(info){
    return this._http.post('/addToBoard',info)
    .map(data => data.json())
    .toPromise();
  }
}
