import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

import firebase  from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    isAuth: boolean;
    isAdmin: boolean;
    isManager: boolean;
    isAuthorizedUserForAccessPrivatePojects: boolean;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { 
        this.isAdmin = false;
    }

    ngOnInit(): void {

        firebase.auth().onAuthStateChanged(
            (user) => {
                if(user) {
                    this.isAuth = true;

                    firebase.firestore().collection('admins').where("user_uid", "==", user.uid).get()
                        .then(
                            (docs) => {
                                if (docs.empty){

                                }else {
                                    this.isAdmin = true;
                                }
                            }
                        );


                    firebase.firestore().collection('managers').where("user_uid", "==", user.uid).get()
                        .then(
                            (docs) => {
                                if (docs.empty){

                                }else {
                                    this.isManager = true;
                                }
                            }
                        );



                } else {
                    this.isAuth = false;
                    this.isAdmin = false;
                    this.isManager = false;
                }
            }
        );

    }



    onNavigateToInverstors() {
        this.router.navigate([ "/home/investors" ]);
    }

    onNavigateToPrivateProjets() {
        this.router.navigate( ['/home/private-projects'] );
    }

    onNavigateToPublicProjects() {
        this.router.navigate([ "/home/projects" ]);
    }


    onSignOut() {
        this.authService.signOutUser();
    }


    onNavigateToLoginOrDashboard() {
        
        if(this.isAuth) {
            this.router.navigate(['/auth', 'dashboard']);
            //console.log('Already login');
        } else {
            this.router.navigate(['/auth', 'signin']);
            //console.log('need to log in');
        }

    }

}
