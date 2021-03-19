import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/database/projects.service';


import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { UserService } from 'src/app/services/database/user.service';


@Component({
  selector: 'app-saige-user-projects',
  templateUrl: './saige-user-projects.component.html',
  styleUrls: ['./saige-user-projects.component.css']
})
export class SaigeUserProjectsComponent implements OnInit {

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
    ) { 

        
        

    }

    ngOnDestroy(): void {
        
        this.projects.length = 0;

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
        ////console.log(this.firebaseUser.emailVerified);

        /*firebase.firestore().collection('users').where("user_uid", "==", "tfuNvJkvhRSia3xY3WcrsMn44cp2").get()
            .then(
                (docs) => {

                    docs.forEach( (doc)=> {
                        this.user = doc.data();

                        this.userAddress = this.user.address;
                        this.userPhone = this.user.phone;
                        this.userName = this.user.name;
                        this.userBirthday = this.user.birthday.toDate();

                       
                    });

                }
            );*/

            //console.log("user ", this.user);


        //this.userVerified = this.firebaseUser.emailVerified;
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


    compressDescription(desc: string) {

        if (desc.length > 66) {
            return desc.slice(0, 65);
        }else{
            return desc;
        }
    }







    onCreateNewProject() {
        this.router.navigate(['/dashboard', { outlets: { userDashboard: ['new-project'] } }]);
    }

    onSingleProjectEditClicked(id: any){
        //console.log(id);
        //this.router.navigate(['/auth/dashboard', 'edit-project', id]);
        this.router.navigate(['/dashboard', { outlets: { userDashboard: ['edit-project', id] } }]);
    }

}
