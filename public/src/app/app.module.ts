import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; 
import { PinService } from './pin.service';
import { BoardService } from './board.service';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogregComponent } from './logreg/logreg.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ExploreComponent } from './explore/explore.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardsComponent } from './boards/boards.component';
import { PinsComponent } from './pins/pins.component';
import { InterestComponent } from './interest/interest.component';
import { SinglePinComponent } from './single-pin/single-pin.component';
    
@NgModule({
  declarations: [
    AppComponent,
    LogregComponent,
    HeaderComponent,
    HomeComponent,
    ExploreComponent,
    ProfileComponent,
    BoardsComponent,
    PinsComponent,
    InterestComponent,
    SinglePinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
    exports: [
    RouterModule
  ],
  providers: [PinService,BoardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
