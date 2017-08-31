import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { PinService } from '../pin.service';


@Component({
  selector: 'app-logreg',
  templateUrl: './logreg.component.html',
  styleUrls: ['./logreg.component.css']
})
export class LogregComponent implements OnInit {

  exists = false
  logForm
  gender = false
  register = true
  valid = false
  currentUser
  validUser
  counter = 0
  topics = false


  user = {
    email: '',
    password: '',
    name: '',
    gender: '',
    age: ''
  }
  login = {
    email: '',
    password: ''
  }

  constructor(private _pinService: PinService, private _router: Router) { }


  ngOnInit() {

  }

  onSubmit() {
    this._pinService.checkEmail(this.user).then(apiUser => {
      if (apiUser.length >= 1) {
        this.exists = true
        this.gender = false
        this.register = true
      }
      else {
        this.gender = true
        this.register = false
      }
    }).catch(err => console.log(err));
  }

  addUser() {
    this._pinService.sendUser(this.user).then(user => this.validUser = user).catch(err => console.log(err));
    this._pinService.loggedUser = this.user;
    this._router.navigateByUrl('/interest');
  }

  loginForm() {
    this.gender = false
    this.register = false
    this.logForm = true
  }

  loginUser() {
    this._pinService.login(this.login).then(apiUser => {
      this.currentUser = apiUser;
      if (apiUser.length >= 1) {
        this._pinService.loggedUser = apiUser[0];
        this._pinService.showHeader = true;
        this._router.navigateByUrl('/home');
      }
      else {
        this.valid = true;
      }
    }).catch(err => console.log(err));
  }

  goBack() {
    this.gender = false
    this.register = true
  }

  goBackToLoginReg() {
    this.gender = false
    this.register = true
    this.logForm = false
  }

}
