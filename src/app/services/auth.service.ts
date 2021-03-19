import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { EncrytStorageService } from './security/encryt-storage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
	userData: any; // Save logged in user data
	isAuth: boolean;

	constructor(
		private router: Router,
		private secureStorageService: EncrytStorageService

	){
		
	}


	checkUserLogginState() {


		firebase.auth().onAuthStateChanged(
            (user) => {
                if(user) {
                    this.isAuth = true;
                } else {
                    this.isAuth = false;
                }
            }
		);
		
		return this.isAuth;
	}


	createNewUser(
			email: string, password: string,
			name: string, birthday: string) {
		return new Promise(
		  (resolve, reject) => {
			firebase.auth().createUserWithEmailAndPassword(email, password).then(
			  () => {

				//Crete a new user
				if (firebase.auth().currentUser ){
					
					firebase.firestore().collection("users").add(
						{
							name: name,
							email: email,
							birthday: birthday,
							role: "ROLE_USER",
							photo_url: "",
							phone: "",
							addresse: "",
							user_uid: firebase.auth().currentUser.uid
						}
					);  //Not need to resolve creating new user
	
					resolve();
				}
				
			  },
			  (error) => {
				reject(error);
			  }
			);
		  }
		);
	}

	signInUser(email: string, password: string) {
		return new Promise(
		  (resolve, reject) => {
			firebase.auth().signInWithEmailAndPassword(email, password).then(
			  () => {
				resolve();
			  },
			  (error) => {
				reject(error);
			  }
			);
		  }
		);
	}

	signOutUser() {
		firebase.auth().signOut().then(
			() => {

				//Reset the private project local data
				this.secureStorageService.setdata('saige-tr', false);

				this.router.navigate(['/home']);
			}
		)
	}
}
