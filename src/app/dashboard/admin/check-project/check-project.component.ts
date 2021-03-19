import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SingleProjectService } from 'src/app/services/database/single-project.service';


import firebase from 'firebase/app';
import 'firebase/firestore';
import { Project } from 'src/app/models/Project.model';

@Component({
  selector: 'app-check-project',
  templateUrl: './check-project.component.html',
  styleUrls: ['./check-project.component.css']
})
export class CheckProjectComponent implements OnInit, OnDestroy, AfterViewInit {

    isProjectApprouved: string;
    projectCheckMessage: string;

    projectId: any;
    project: any;
    user: any;

    isUpdatingProjectStatus: boolean;

    @ViewChild("projectYoutube")
    projectYoutube: ElementRef;


    constructor(
      private activeRoute: ActivatedRoute,
      private singleProjectService: SingleProjectService
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


                    

                    //Need to get the user name
                    let docu = firebase.firestore().collection('users').where("user_uid", "==", this.project.user_uid);
                    docu.get().then(
                        (docs) => {

                            docs.forEach( (doc) => {
                                if(doc.exists){
                                    //console.log("Found User document", doc.data(), doc.id);
                                   this.user = doc.data();
                                   
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
        if(this.project.approuved){
            //console.log("Already approuved");
        }else {
            this.isUpdatingProjectStatus = true;

            firebase.firestore().collection("projects").doc(this.projectId)
                .update(
                    {
                        approuved: true
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
        if(!this.project.approuved){
            //console.log("Already non approuved");
        }else {
            this.isUpdatingProjectStatus = true;

            firebase.firestore().collection("projects").doc(this.projectId)
                .update(
                    {
                        approuved: false
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
                this.isUpdatingProjectStatus = false;
            } ).catch( (error) => {
                this.isUpdatingProjectStatus = false;
            });

    }




}
