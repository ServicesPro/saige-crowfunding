import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


import firebase from 'firebase/app';
import 'firebase/firestore'
import { firestore } from 'firebase-admin';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

    constructor(private router: Router) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().onAuthStateChanged(
                    (user) => {
                        if(user) {
                            //Get the the user role
                                let currentUser = firebase.auth().currentUser;

                                let getOptions = {
                                    source: 'cache'
                                };

                                firebase.firestore().collection("admins").where('user_uid', "==", currentUser.uid )
                                .get()
                                    .then( (docs) => {
                                        if (!docs.empty) {
    
                                            resolve(true);
                                                
    
                                        } else {
                                            // doc.data() will be undefined in this case
                                            //console.log("No such document!");
                                            this.router.navigate(['/home']);
                                            resolve(false);
                                        }         
                                });


                            
                        } else {
                            this.router.navigate(['/home']);
                            resolve(false);
                        }
                    
                    
                    }
                );
            
            }
        )
    }
}
