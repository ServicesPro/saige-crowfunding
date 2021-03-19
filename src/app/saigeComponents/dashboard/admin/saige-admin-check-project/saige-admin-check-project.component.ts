import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { SingleProjectService } from 'src/app/services/database/single-project.service';
import { SaigeEmailService } from 'src/app/services/http/saige-email.service';




@Component({
  selector: 'app-saige-admin-check-project',
  templateUrl: './saige-admin-check-project.component.html',
  styleUrls: ['./saige-admin-check-project.component.css']
})
export class SaigeAdminCheckProjectComponent implements OnInit {

  isProjectApprouved: string;
    projectCheckMessage: string;

    projectId: any;
    project: any;
    user: any;

    hasGotUser: boolean = false;
    hasGotProject: boolean = false;

    isUpdatingProjectStatus: boolean;

    @ViewChild("projectYoutube")
    projectYoutube: ElementRef;



    messageNotificationUrl: string = "https://www.saige-financialplateform.com/notify-message"; //"http://localhost:3000/notify-message";;


    constructor(
        private activeRoute: ActivatedRoute,
        private singleProjectService: SingleProjectService,
        private httpEmailService: SaigeEmailService
    ) { 
        
    }
    ngAfterViewInit(): void {
        this.projectYoutube.nativeElement.setAttribute("src", this.project.video_link);
    }

    ngOnDestroy(): void {
        this.project = null;
        this.user = null;
    }

    ngOnInit(): void {
      const id = this.activeRoute.snapshot.params["id"];
        this.projectId = id;

        //Get the project data here
         this.singleProjectService.getSingleProjectByUid(this.projectId)
            .then(
                (data) => {
                    //console.log(data);
                    this.project = data;
                    this.hasGotProject = true;


                    

                    //Need to get the user name
                    let docu = firebase.firestore().collection('users').where("user_uid", "==", this.project.user_uid);
                    docu.get().then(
                        (docs) => {

                            docs.forEach( (doc) => {
                                if(doc.exists){
                                    //console.log("Found User document", doc.data(), doc.id);
                                   this.user = doc.data();
                                   this.hasGotUser = true;
                                   
                                }else {
                                    //console.log("Not found document");
                                    
                                }
                            } );
                            
                        }
                    ).catch(
                        function(error) {
                            //console.log(error);
                           
                        }
                    )
                }
        );
    }


   

    convertDate(d) {
        let date = new Date(d);
    
        let months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai",
                        "Juin", "Juillet", "Août", "Septembre", "Octobre",
                    "Novembre", "Décembre"];
        return "" + date.getDay() + " " + months[date.getMonth()] + " " + date.getFullYear();
    }

    onSaveProjectCheckApprouved(){
        if(this.project.approuved == 'accept'){
            //console.log("Already approuved");
        }else {
            this.isUpdatingProjectStatus = true;

            firebase.firestore().collection("projects").doc(this.projectId)
                .update(
                    {
                        approuved:'accept'
                    }
                ).then(
                    () => {
                        //console.log("Approuved");
                        this.isUpdatingProjectStatus = false;
                        window.location.reload();
                    }
                );
        }
    }

    onSaveProjectCheckRejected(){
        if(!( this.project.approuved == 'reject') ){
            
        }else {
            this.isUpdatingProjectStatus = true;

            firebase.firestore().collection("projects").doc(this.projectId)
                .update(
                    {
                        approuved: 'reject'
                    }
                ).then(
                    () => {
                        this.isUpdatingProjectStatus = false;
                        window.location.reload();
                    }
                );
        }
    }

    onSaveProjectCheckRetire(){
        if(this.project.approuved == "none" ){
          
        }else {
            this.isUpdatingProjectStatus = true;

            firebase.firestore().collection("projects").doc(this.projectId)
                .update(
                    {
                        approuved: 'none'
                    }
                ).then(
                    () => {
                        //console.log("Removed");
                        this.isUpdatingProjectStatus = false;
                        window.location.reload();
                    }
                );
        }
    }


    onSaveProjectCheckMessage(){
        this.isUpdatingProjectStatus = true;

        firebase.firestore().collection("messages").add(

            {
                content: this.projectCheckMessage,
                project_uid: this.projectId,
                created_at: new Date()

            }
      
            ).then( (docRef) => {
                //Sen notification email here
                this.httpEmailService.postDataWithEmail(
                    this.user.email, //The receiver email not the current user email
                    this.messageNotificationUrl,
                    {
                        project_name: this.project.name,
                        message: this.projectCheckMessage
                    }
                )
                this.isUpdatingProjectStatus = false;

                
            } ).catch( (error) => {
                this.isUpdatingProjectStatus = false;
            });

    }

}
