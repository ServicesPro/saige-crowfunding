import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import "firebase/firestore";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuardService {

    constructor(private router: Router) { }

	canActivate(): Observable<boolean> | Promise<boolean> | boolean {
		return new Promise(
			(resolve, reject) => {
				firebase.auth().onAuthStateChanged(
				(user) => {


                    //Check if the user is a manager
                    let currentUser = firebase.auth().currentUser;
                    firebase.firestore().collection("managers").where('user_uid', "==", currentUser.uid )
                    .get()
                    .then( (docs) => {
                            if (!docs.empty) {
    
                                 resolve(true);
                                                
    
                            } else {
                                // doc.data() will be undefined in this case
                                //console.log("No such document!");
                                this.router.navigate(['/auth', 'dashboard']);
                                resolve(false);
                            }         
                    });


					if(user.emailVerified) {
						resolve(true);
					} else {
						this.router.navigate(['/auth', 'dashboard']);
						resolve(false);
					}
				}
				);
			}
		);
	}
  
}
