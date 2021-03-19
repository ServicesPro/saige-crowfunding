import { Component, Input, OnDestroy, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../models/Project.model';
import { ProjectsService } from '../services/database/projects.service';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { UserService } from '../services/database/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

    projects: any[] = [];
    user: any;
    firebaseUser: firebase.User;
    isUserProjectsReady: boolean = false;
    verificationEmailSent: boolean = false;
    verificationEmailSentError: boolean = false;
    isSentingVerificationEmail: boolean = false;

    userVerified: boolean;
    isDataReady: boolean = false;


    isUpdating: boolean;



    @Input()
    userName: string;
    userAddress: string;
    userBirthday: Date;
    userPhone: string;


    userPhotoImageFile: FileList

    constructor(
        private router: Router,
        private projectService: ProjectsService,
        private userService: UserService
    ) { 

        
        

    }

    ngOnDestroy(): void {
        
        this.projects.length = 0;

    }


    changeEmail() {
        this.router.navigate(['auth/dashboard/update-email']);
    }

    changePassword() {
        this.router.navigate(['auth/dashboard/update-password']);
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


    getDatas(data) {
        //console.log(data);
    }

    ngOnInit(): void {


        //Get the user
        this.isDataReady = false;

        this.firebaseUser = firebase.auth().currentUser;
        //console.log(this.firebaseUser.emailVerified);

        firebase.firestore().collection('users').where("user_uid", "==", this.firebaseUser.uid).get()
            .then(
                (docs) => {

                    docs.forEach( (doc)=> {
                        this.user = doc.data();

                        this.userAddress = this.user.address;
                        this.userPhone = this.user.phone;
                        this.userName = this.user.name;
                        this.userBirthday = this.user.birthday.toDate();

                        //console.log(this.user);
                    });

                }
            );

            //console.log("user ", this.user);


        this.userVerified = this.firebaseUser.emailVerified;
        //console.log(this.userVerified, "Verified");
        this.projectService.getProjectsByUserUid("").then(
            (data) => {

                this.projects = this.projectService.getDatas();
                this.isUserProjectsReady = true;
                //console.log(this.projects);
                this.isDataReady = true;
            }
        );
        
    }



    handleFileUserProfile(event) {
        this.userPhotoImageFile = event.target.files;
        //console.log(this.userPhotoImageFile)
    }


    onSaveUserProfileImage() {

        this.isUpdating = true;

        this.userService.uploadUserImageFile(this.userPhotoImageFile.item(0))
            .then(
                (url) => {
                    //console.log("File uploaded", url);
                    this.user.photo_url = url;

                    this.isUpdating = false;
                },

                (error) => {
                    //console.log(error);
                    this.isUpdating = false;
                }
            )

    }


    onSaveUserName() {


        this.isUpdating = true;

        this.userService.updateUserName(this.userName)
            .then(
                () => {
                    //console.log("success");
                    this.user.name = this.userName;

                    this.isUpdating = false;
                },

                (error) => {
                    //console.log(error);
                    this.isUpdating = false;
                }
            )

    }

    onSaveUserBirthday() {


        this.isUpdating = true;

        this.userService.updateUserBirthday(this.userBirthday)
            .then(
                () => {
                    //console.log("success");
                    this.isUpdating = false;
                },

                (error) => {
                    //console.log(error);

                    this.isUpdating = false;
                }
            )

    }


    onSaveUserAddress() {


        this.isUpdating = true;

        this.userService.updateUserAddress(this.userAddress)
            .then(
                () => {
                    //console.log("success");

                    this.isUpdating = false;
                },

                (error) => {
                    //console.log(error);
                    this.isUpdating = false;
                }
            )

    }


    onSaveUserPhone() {

        this.isUpdating = true;

        this.userService.updateUserPhone(this.userPhone)
            .then(
                () => {
                    //console.log("success");
                    this.isUpdating = false;
                },

                (error) => {
                    //console.log(error);
                    this.isUpdating = false;
                }
            )

    }








    onCreateNewProject() {
        this.router.navigate(['/auth/dashboard', 'new-project']);
    }

    onSingleProjectEditClicked(id: any){
        //console.log(id);
        this.router.navigate(['/auth/dashboard', 'edit-project', id]);
    }

  

}
