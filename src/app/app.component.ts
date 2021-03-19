



import { Component } from '@angular/core';
import firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { EncrytStorageService } from './services/security/encryt-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Saige';

  constructor(
    private secureStorageService: EncrytStorageService
  ){
    
    

    firebase.initializeApp( environment.firebaseConfig );
  }
}
