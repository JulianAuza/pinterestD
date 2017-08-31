import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class PinService {

  showHeader = false;

  loggedUser;
  viewedUser;

  constructor(private _http: Http) { }

  logout(){
    this.loggedUser = {}
    this.viewedUser = {}
    return this._http.get('/api/logout').map(data => data.json()).toPromise(); 
  }

  grabUserUsingID(userID){
    return this._http.post('/api/grabUserUsingID', {'userID':userID}).map(data => data.json()).toPromise();    
  }

  addUserInterest(interest) {
    return this._http.post('/api/addUserInterest', {'interest':interest}).map(data => data.json()).toPromise();
  }

  checkEmail(user) {
    return this._http.post('/api/checkEmail', user).map(data => data.json()).toPromise();
  }

  sendUser(user) {
    this.loggedUser = user;
    return this._http.post('/api/register', user).map(data => data.json()).toPromise();
  }

  login(user) {
    return this._http.post('/api/login', user).map(data => data.json()).toPromise();
  }

  grabUser() {
    return this._http.get('/api/getCurrentUser').map(data => data.json()).toPromise();
  }

  sendUrl(url) {
    var context = {
      myUrl: url.address
    }
    return this._http.post('/api/imageOptions', context).map(data => data.json()).toPromise();
  }

  grabUrls() {
    return this._http.get('/api/imageGrab').map(data => data.json()).toPromise();
  }

  retrieveBoards(){
    return this._http.get('/api/boards').map(data => data.json()).toPromise();
  }

  sendPin(pin){
    return this._http.post('/api/createPin', pin).map(data => data.json()).toPromise();
  }

  retrievePins(){
    return this._http.get('/api/pins').map(data => data.json()).toPromise();
  };

  retrieveUserPins(user){
    return this._http.post('/api/retrieveUserPins', user).map(data => data.json()).toPromise();    
  }

  retrievePin(id){
    var context = {
      id: id
    }
    return this._http.post('/api/singlepin', context).map(data => data.json()).toPromise();
  };

  grabUserPins(pinOwner) {
    return this._http.post('/api/grabUserPins', pinOwner).map(data => data.json()).toPromise();    
  }

  followUser(followObj){
    return this._http.post('/api/follow', followObj).map(data => data.json()).toPromise();
  }

  removePin(pin, board){
    var context = {
      pin: pin,
      board: board,
      user: this.loggedUser
    }
    return this._http.post('/api/removePin', context).map(data => data.json()).toPromise();
  }

  unfollowUser(followObj){
    return this._http.post('/api/unfollow', followObj).map(data => data.json()).toPromise();
  }

  grabmyBoard(board){
    return this._http.post('/api/viewingBoard', board).map(data => data.json()).toPromise();
  }

}
