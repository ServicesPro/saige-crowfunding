import { Component, Input, OnInit } from '@angular/core';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/database/projects.service';
import { UserService } from 'src/app/services/database/user.service';


@Component({
  selector: 'app-saige-user-profile',
  templateUrl: './saige-user-profile.component.html',
  styleUrls: ['./saige-user-profile.component.css']
})
export class SaigeUserProfileComponent implements OnInit {

    projects: any[] = [];
    user: any;
    firebaseUser: firebase.User;
    isUserProjectsReady: boolean = false;
    verificationEmailSent: boolean = false;
    verificationEmailSentError: boolean = false;
    isSentingVerificationEmail: boolean = false;

    userVerified: boolean;
    


    isUpdating: boolean;



    @Input()
    userName: string;
    userAddress: string;
    userBirthday: Date;
    userPhone: string;


    userPhotoImageFile: FileList

    constructor(
        private router: Router,
        private userService: UserService
    ) { 

        
        

    }

    ngOnDestroy(): void {
        
        this.projects.length = 0;

    }


    changeEmail() {
        //this.router.navigate(['auth/dashboard/update-email']);
        this.router.navigate(['/dashboard', { outlets: { userDashboard: ['update-email'] } }]);
    }

    changePassword() {
        //this.router.navigate(['auth/dashboard/update-password']);
        this.router.navigate(['/dashboard', { outlets: { userDashboard: ['update-password'] } }]);
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
                        this.userBirthday = new Date(this.user.birthday);

                        //console.log(this.user);
                    });

                }
            );

            //console.log("user ", this.user);


        this.userVerified = this.firebaseUser.emailVerified;
        //console.log(this.userVerified, "Verified");
        
        
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

}
