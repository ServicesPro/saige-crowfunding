import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { EncrytStorageService } from 'src/app/services/security/encryt-storage.service';


@Component({
  selector: 'app-saige-dashboard',
  templateUrl: './saige-dashboard.component.html',
  styleUrls: ['./saige-dashboard.component.css']
})
export class SaigeDashboardComponent implements OnInit, AfterViewInit {

    
    
    @ViewChild("openDashboard")
    dashboardOpener: ElementRef;

    @ViewChild("dashboardMenu")
    dashboardMenu: ElementRef;

    @ViewChild("openDashboardImage")
    dashboardMenuImage: ElementRef;


    dashboardMenuShown:boolean = false;
    windowsRules: any = window.matchMedia('(max-width: 400px)');

    


    isAdmin: boolean = false;
    isManager: boolean = false;
    isAuth: boolean;
    isDataReady: boolean;
    firebaseUser: firebase.User;
    userVerified: any;
    projectService: any;
    projects: any;
    isUserProjectsReady: boolean;
    isSentingVerificationEmail: boolean;
    verificationEmailSent: boolean;
    verificationEmailSentError: boolean;
    
    constructor(
        private renderer: Renderer2,
        private router: Router,
        private secureStorageService: EncrytStorageService
    ) { }


   

    ngAfterViewInit(): void {
        //console.log(this.dashboardOpener);
        //console.log(this.dashboardMenuImage);
        //console.log(this.dashboardMenu);


        var toggleDashboardMenu = () => {
            if (this.dashboardMenuShown == false) {
                this.renderer.setStyle(this.dashboardMenu.nativeElement, 'display',  'block');
                this.dashboardMenuShown = true;
                this.dashboardMenuImage.nativeElement.setAttribute('src', 'assets/img/dashboard/close.svg');
            }else {
                this.renderer.setStyle(this.dashboardMenu.nativeElement, 'display',  'none');
                this.dashboardMenuShown = false;
                this.dashboardMenuImage.nativeElement.setAttribute('src', 'assets/img/dashboard/dashboard.svg');
            }
        }

        var handleMenu = (rules) =>  {

			if (rules.matches) {
                //Handle click on toggler button here
                this.dashboardMenuShown = false;
                this.renderer.setStyle(this.dashboardOpener.nativeElement, 'display',  'block');
                this.renderer.setStyle(this.dashboardMenu.nativeElement, 'display',  'none');
				this.renderer.listen(this.dashboardOpener.nativeElement, 'click', toggleDashboardMenu)
				

			}else {

                //Nothing to do
                this.renderer.setStyle(this.dashboardMenu.nativeElement, 'display',  'block');
				
			}
		}

		handleMenu(this.windowsRules);
		this.windowsRules.addEventListener("change", handleMenu);
    }

    ngOnInit(): void {





        //Get the user
        this.isDataReady = false;

        this.firebaseUser = firebase.auth().currentUser;
        //console.log(this.firebaseUser.emailVerified);


        this.userVerified = this.firebaseUser.emailVerified;
        //console.log(this.userVerified, "Verified");
        

        
        
        let adminStorageValue = this.secureStorageService.getData("saaige_tr");
        let managerStorageValue = this.secureStorageService.getData("smaige_tr");

        //console.log(adminStorageValue, managerStorageValue);


        if( !adminStorageValue  && !managerStorageValue) {
            firebase.auth().onAuthStateChanged(
                (user) => {
                    if(user) {

                        this.isAuth = true;


                        
                        firebase.firestore().collection('admins').where("user_uid", "==", user.uid).get()
                        .then(
                            (docs) => {
                                if (docs.empty){
                                    this.secureStorageService.setdata("saaige_tr", false);
                                }else {
                                    this.isAdmin = true;
                                    this.secureStorageService.setdata("saaige_tr", true);
                                }
                            }
                        );

                        setTimeout(() => {
                            this.secureStorageService.remove("saaige_tr");
                        }, 1000 * 60 * 30);


                        
                        firebase.firestore().collection('managers').where("user_uid", "==", user.uid).get()
                            .then(
                                (docs) => {
                                    if (docs.empty){
                                        this.secureStorageService.setdata("smaige_tr", false);
                                    }else {
                                        this.isManager = true;
                                        this.secureStorageService.setdata("smaige_tr", true);
                                    }
                                }
                            );

                            setTimeout(() => {
                                this.secureStorageService.remove("smaige_tr");
                            }, 1000 * 60 * 30);



                    } else {
                        this.isAuth = false;
                        this.isAdmin = false;
                        this.isManager = false;
                    }
                }
            );
        }else {

            if (adminStorageValue) {
                this.isAdmin = true;
            }else {
                this.isAdmin = false;
            }


            if(managerStorageValue){
                this.isManager = true;
            }else {
                this.isManager = false;
            }

        }

    }

    


    sendVerificationEmail() {
        this.isSentingVerificationEmail = true;
        this.firebaseUser.sendEmailVerification()
        .then(
            () => {
                this.verificationEmailSent = true;
                this.isSentingVerificationEmail = false;
            }
        ).catch( () => {
            this.verificationEmailSentError = true;
            this.isSentingVerificationEmail = false;
        });
    }

    onNavigateToProfile() {
        this.router.navigate(['/dashboard', { outlets: { userDashboard: ['profile'] } }]);
    }

    onNavigateToProjects() {
        this.router.navigate(['/dashboard', { outlets: { userDashboard: ['projects'] } }]);
    }

    onNavigateToAdmin() {
        this.router.navigate(['/dashboard', { outlets: { userDashboard: ['admin', 'projects'] } }]);
    }

    onNavigateToManager() {
        this.router.navigate(['/dashboard', { outlets: { userDashboard: ['manager', 'users'] } }]);
    }

    onNavigateToPrivateProjects(){
        this.router.navigate(['/home', 'private-projects']);
    }

}
