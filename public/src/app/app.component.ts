import { Component, OnInit } from '@angular/core';
import { PinService } from './pin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _pinService: PinService, private _router: Router) { }
  
  OnInit(){
    
  }

}
