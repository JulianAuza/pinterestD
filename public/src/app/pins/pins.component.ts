import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PinService } from '../pin.service';

@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.css']
})
export class PinsComponent implements OnInit {
  imageOptions = false;
  currentUser

  lastStep = false;
  boards = []
  pins = []
  pinOwner = this._pinService.viewedUser

  pin = {
    img: "",
    url: "",
    title: "",
    creator: "",
    description: "",
    board: "",
    category: ""
  }

  url = { 
    address : ""
  }

  interests = [
    {topic: 'DIY and home improvment', url: 'https://i.pinimg.com/400x/c2/3f/47/c23f47a4db51bdd7a94b330c3bf70303.jpg', selected:false},
    {topic: 'Home decor', url: 'https://i.pinimg.com/400x/8d/45/98/8d4598e35340e87650f70548c77e4847.jpg', selected:false},
    {topic: 'Food and drink', url: 'https://i.pinimg.com/400x/10/31/0a/10310a3d860e8f7f2a5753612a870f5a.jpg', selected:false},
    {topic: 'Technology', url: 'https://s-media-cache-ak0.pinimg.com/400x/87/c3/d5/87c3d525d467f3f0015b05a3865b14c1.jpg', selected:false},
    {topic: 'Humor', url: 'https://s-media-cache-ak0.pinimg.com/400x/8f/10/c9/8f10c915847860f700ed37a098d7eb50.jpg', selected:false},
    {topic: 'Design', url: 'https://s-media-cache-ak0.pinimg.com/400x/97/da/87/97da87a886fe09d9b79db0ab8f6ee600.jpg', selected:false},
    {topic: 'Travel', url: 'https://s-media-cache-ak0.pinimg.com/400x/02/69/c8/0269c81fb094b2d251415318ee34ca26.jpg', selected:false},
    {topic: 'Art', url: 'https://s-media-cache-ak0.pinimg.com/400x/a9/e5/60/a9e56077c22bfd00ca63a5e7cacded85.jpg', selected:false},
    {topic: 'Photography', url: 'https://s-media-cache-ak0.pinimg.com/400x/42/f2/69/42f2699dc7da1ff215a1d723fd72a152.jpg', selected:false},
    {topic: 'Education', url: 'https://s-media-cache-ak0.pinimg.com/400x/f4/b7/2b/f4b72b3acb8528c420b15b77c46ddc50.jpg', selected:false},
    {topic: 'Recipes', url: 'https://s-media-cache-ak0.pinimg.com/400x/e7/2b/13/e72b13b2958c9c046a2626e4e89371bf.jpg', selected:false},
    {topic: 'Memes', url: 'https://s-media-cache-ak0.pinimg.com/400x/e0/f9/cf/e0f9cfbdd02e2f764d8dd67a1048c689.jpg', selected:false},
    {topic: 'Life quotes', url: 'https://s-media-cache-ak0.pinimg.com/400x/f4/3f/3e/f43f3ec1ca602f0b0f3fe31e661cab25.jpg', selected:false},
    {topic: 'Drawing', url: 'https://s-media-cache-ak0.pinimg.com/400x/9b/79/3c/9b793cff577b4ed2cfdbe494d8224a45.jpg', selected:false},
    {topic: 'Craft beer', url: 'https://s-media-cache-ak0.pinimg.com/400x/72/45/8d/72458d6f147acd41305b1b4ab9c1084a.jpg', selected:false},
    {topic: 'Dogs', url: 'https://s-media-cache-ak0.pinimg.com/400x/79/9e/91/799e91f4b7e03368cfdfb8ba97b508d9.jpg', selected:false},
    {topic: 'Weddings', url: 'https://s-media-cache-ak0.pinimg.com/400x/d0/d2/28/d0d228edbb02243fb9fa7bd1c083bacf.jpg', selected:false},
    {topic: 'Gardening', url: 'https://s-media-cache-ak0.pinimg.com/400x/55/aa/c9/55aac9cda59ab7c5cd57a5665962a279.jpg', selected:false},
    {topic: 'Furniture', url: 'https://s-media-cache-ak0.pinimg.com/400x/fe/67/89/fe6789dc92819219aad45a598b650ba4.jpg', selected:false},
    {topic: 'Architecture', url: 'https://s-media-cache-ak0.pinimg.com/400x/ee/7f/86/ee7f8649af3509ea64da7d2e5417866e.jpg', selected:false} 
  ]

  imageList = [];

  constructor(private _pinService:PinService, private _router: Router){}
  
  ngOnInit() {
    this._pinService.grabUser().then(currUser => {
      this.currentUser = currUser;
      this.pin.creator = currUser;
      this.grabBoards();
    }).catch(err => console.log(err));
    this._pinService.grabUserPins(this.pinOwner).then(apiPins => {
      this.pins = apiPins.pins;
    }).catch(err => console.log(err));
  }

  grabBoards(){
    this._pinService.retrieveBoards().then(boards =>{
      this.boards = boards;
    }).catch(err => console.log(err));
  }

  gotUrl() {
    this.pin.url = this.url.address;
    this._pinService.sendUrl(this.url).then(response => { 
      this.imageList = response;
      this.imageOptions = true;
    }).catch(err => console.log(err));
  }

  chooseImg(link){
    this.pin.img = link;
    this.imageOptions = false;
    this.lastStep = true;
  }

  createPin() {
    this._pinService.sendPin(this.pin).then(response => {
      this.pin = {img: "", url: "", title: "", creator: "", description: "", board: "", category: ""};
      this._router.navigateByUrl('/profile/' + this.currentUser._id + '/boards');
    }).catch(err => console.log(err)); 
  }

}
