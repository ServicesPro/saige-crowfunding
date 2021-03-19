import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import 'firebase/auth';
import { EncrytStorageService } from 'src/app/services/security/encryt-storage.service';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.css']
})
export class HomeCarouselComponent implements OnInit {


  isAuth: boolean;

  constructor(
    private router: Router,
    private secureStorageService: EncrytStorageService
  ) {
    //Clear the storage cache
    secureStorageService.clear();
   }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) => {
          if(user) {
              this.isAuth = true;
          } else {
              this.isAuth = false;
          }
      }
  );
  }


  onNavigateToNewProject(){
    if ( this.isAuth ) {
      this.router.navigate(["/auth", "dashboard"]);
    }else {
      this.router.navigate(["/auth", "signin"]);
    }
  }

}
