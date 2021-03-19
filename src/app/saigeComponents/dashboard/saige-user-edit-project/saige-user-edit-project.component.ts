import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from 'src/app/services/database/messages.service';
import { SingleProjectService } from 'src/app/services/database/single-project.service';

@Component({
  selector: 'app-saige-user-edit-project',
  templateUrl: './saige-user-edit-project.component.html',
  styleUrls: ['./saige-user-edit-project.component.css']
})
export class SaigeUserEditProjectComponent implements OnInit {

  @Input()
    projectName: string = "";

    @Input()
    projectDescription: string = "";
    projectDuration: number  = 0;
    projectDomain: string  = "";
    projectCurrency: string  = "";
    projectAmount: number  = 1;
    projectVideoLink: string  = "";


    projectId: string = "yXhZrL4F7YOgkRZ7ID2r";
    isProjectApprouved: string = "none";

    projectSmallFile: FileList;
    projectBigFile: FileList;
    

    @Input()
    smallImageUrl: string = "";
    bigImageUrl: string = "";
    projectSectionOneImageUrl: string = "";
    projectSectionTwoImageUrl: string = "";
    projectSectionThreeImageUrl: string = "";
    projectSectionFourImageUrl: string = "";

    @Input()
    projectSummary: string;
    projectOrganisationDescription: string;

    @Input()
    projectReasonOne: string  = "" 
    projectReasonTwo: string  = "";
    projectReasonThree: string  = "";
    projectReasonFour: string  = "";


    projectReasonOneFile: FileList;
    projectReasonTwoFile: FileList;
    projectReasonThreeFile: FileList;
    projectReasonFourFile: FileList;




    messages: any;


    //Use to rendering the img tags
    isProjectFinishedToLoad: boolean = false;

    //Showing spinner for indicating loading
    //data in database
    isUpdatingData: boolean = false;
    hasSucesUpdate: number = 0;
    projectApprouved: string  = "";



    //Routing caller on parameters



    constructor(
        private singleProjectService: SingleProjectService,
        private messagesService: MessagesService,
        private router: ActivatedRoute
    ) { 


        this.isUpdatingData = false;

        
    }

    ngOnInit(): void {

        //Get the router parameter here
        //which is the project wanted id
        const id = this.router.snapshot.params["id"];
        //console.log(id);

        this.projectId = id;


        //Load the project
        this.singleProjectService.getSingleProjectByUid(this.projectId).then(
            (data: any) => {
                //console.log("From Service", data.name );

                this.projectName = data.name;
                this.projectDescription = data.description;
                this.projectDuration = data.duration;
                this.projectDomain = data.domain;
                this.projectCurrency = data.currency;
                this.projectAmount= data.money_wanted;
                this.projectVideoLink = data.video_link;
                this.isProjectApprouved = data.approuved;
                this.projectApprouved = data.approuved;;
                this.projectSummary = data.summary;
                this.projectOrganisationDescription = data.organisation;
                this.projectReasonOne = data.sec_one;
                this.projectReasonTwo = data.sec_two;
                this.projectReasonThree = data.sec_three;
                this.projectReasonFour = data.sec_four;
                this.projectSectionThreeImageUrl = data.sec_one_url;
                this.projectSectionThreeImageUrl = data.sec_two_url;
                this.projectSectionThreeImageUrl = data.sec_three_url;
                this.projectSectionThreeImageUrl = data.sec_four_url;


                this.isProjectFinishedToLoad = true;
            },
            (error) => {
                //console.log(error);
            }
        );



        this.messagesService.getMessages(this.projectId)
            .then(
                (msg) => {
                    this.messages = [];
                    this.messages = msg;
                    //console.log(this.messages);
                }
            ).catch(
                (error) => {
                    //console.log(error);
                }
            )
    }



    convertDate(d) {
        let date = d.toDate();
    
        let months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai",
                        "Juin", "Juillet", "Août", "Septembre", "Octobre",
                    "Novembre", "Décembre"];
        return "" + date.getDay() + " " + months[date.getMonth()] + " " + date.getFullYear();
    }




    getProjectAvaibility() {
        return this.isProjectApprouved == "none";
    }


    onSaveProjectName(){

        if( this.isProjectApprouved == "none") {
            this.isUpdatingData = true;

            this.singleProjectService
                .updateProjectName(
                    this.projectId, this.projectName
            ).then(
                () => {
                    //Success
                    //hide spinner and display button
                    //console.log("Success name update");
                    this.isUpdatingData = false;
                },

                () => {
                    //We have errors
                    this.isUpdatingData = false;
                }
            );
        }else {
            alert("Projet déjà approuvé ou Vous avez unz erreur de connexion...");
        }
    }

    onSaveProjectDescription(){
        //Compare for change before
        
        if( this.isProjectApprouved == "none") {
            this.isUpdatingData = true;

            this.singleProjectService
                .updateProjectDescription(
                    this.projectId, this.projectDescription
            ).then(
                () => {
                    //Success
                    //hide spinner and display button
                    //console.log("Success desription update");
                    this.isUpdatingData = false;
                },

                () => {
                    //We have errors
                    this.isUpdatingData = false;
                }
            );
        }else {
            alert("Projet déjà approuvé ou Vous avez unz erreur de connexion...");
        }
    }

    onSaveProjectDuration(){

        if( this.isProjectApprouved == "none") {
            this.isUpdatingData = true;

            this.singleProjectService
                .updateProjectDuration(
                    this.projectId, this.projectDuration
            ).then(
                () => {
                    //Success
                    this.isUpdatingData = false;
                },

                () => {
                    this.isUpdatingData = false;
                }
            );
        }else {
            alert("Projet déjà approuvé ou Vous avez unz erreur de connexion...");
        }
    }

    onSaveProjectDomain(){

        if( this.isProjectApprouved == "none") {
            this.isUpdatingData = true;

            this.singleProjectService
                .updateProjectDomain(
                    this.projectId, this.projectDomain
            ).then(
                () => {
                    //Success
                    this.isUpdatingData = false;
                },

                () => {
                    this.isUpdatingData = false;
                }
            );
        }else {
            alert("Projet déjà approuvé ou Vous avez unz erreur de connexion...");
        }
    }

    onSaveProjectCurrency(){

        if( this.isProjectApprouved == "none") {
            this.isUpdatingData = true;

            this.singleProjectService
                .updateProjectCurrency(
                    this.projectId, this.projectCurrency
            ).then(
                () => {
                    //Success
                    this.isUpdatingData = false;
                },

                () => {
                    this.isUpdatingData = false;
                }
            )
        }else {
            alert("Projet déjà approuvé ou Vous avez unz erreur de connexion...");
        }
    }

    onSaveProjectAmount(){

        if( this.isProjectApprouved == "none") {
            this.isUpdatingData = true;

            this.singleProjectService
                .updateProjectAmount(
                    this.projectId, this.projectAmount
            ).then(
                () => {
                    //Success
                    this.isUpdatingData = false;
                },

                () => {
                    this.isUpdatingData = false;
                }
            )
        }else {
            alert("Projet déjà approuvé ou Vous avez unz erreur de connexion...");
        }
    }



    

    


    onSaveProjectVideoLink(){

        if( this.isProjectApprouved == "none") {
            this.isUpdatingData = true;

            this.singleProjectService
                .updateProjectVideoLink(
                    this.projectId, this.projectVideoLink
            ).then(
                () => {
                    //Success
                    this.isUpdatingData = false;
                },

                () => {
                    this.isUpdatingData = false;
                }
            )
        }else {
            alert("Projet déjà approuvé ou Vous avez unz erreur de connexion...");
        }
    }




    //Handling project file information 

    handleFileSmallFileChange(event) {
        this.projectSmallFile = event.target.files;
    }
    
    onSaveProjectSmallImage(){

        if( this.isProjectApprouved == "none") {
            this.isUpdatingData = true;

            this.singleProjectService.uploadImageFile(
                this.projectSmallFile.item(0),
                "small",
                this.projectId
            ).then(
                (url: string) => {

                    //console.log("In edit component", url);
                    this.smallImageUrl = url;

                    this.isUpdatingData = false;
                },

                //Error
                (error) => {
                    //handle errors
                    this.isUpdatingData = false;
                }
            );
        }else {
            alert("Projet déjà approuvé ou Vous avez unz erreur de connexion...");
        }
    }



    
    handleFileBigFileChange(event) {
        this.projectBigFile = event.target.files;
    }

    onSaveProjectBigImage(){

        if( this.isProjectApprouved == "none") {
            this.isUpdatingData = true;

            this.singleProjectService.uploadImageFile(
                this.projectBigFile.item(0),
                "big",
                this.projectId
            ).then(
                (url: string) => {

                    //console.log("In edit component big url ", url);
                    this.bigImageUrl = url;

                    this.isUpdatingData = false;
                },

                //Error
                (error) => {
                    //handle errors
                    this.isUpdatingData = false;
                }
            );

        }else {
            alert("Projet déjà approuvé ou Vous avez unz erreur de connexion...");
        }
    }





    
    onSaveProjectSummary(){


        if( this.isProjectApprouved == "none") {
            this.isUpdatingData = true;

            this.singleProjectService
                .updateProjectSummary(
                    this.projectId, this.projectSummary
            ).then(
                () => {
                    //Success
                    this.isUpdatingData = false;
                },

                (error) => {
                    this.isUpdatingData = false;
                }
            )
        }else {
            alert("Projet déjà approuvé ou Vous avez unz erreur de connexion...");
        }
    }


    onSaveProjectOrganisationDescription(){


        if( this.isProjectApprouved == "none") {
            this.isUpdatingData = true;

            this.singleProjectService
                .updateProjectOrganisation(
                    this.projectId, this.projectOrganisationDescription
            ).then(
                () => {
                    //Success
                    this.isUpdatingData = false;
                },

                () => {
                    this.isUpdatingData = false;
                }
            )
        }else {
            alert("Projet déjà approuvé ou Vous avez unz erreur de connexion...");
        }
    }



   

    onSaveProjectReasonOne(){
        
        if( this.isProjectApprouved == "none") {

            this.isUpdatingData = true;

            this.singleProjectService
                .updateProjectSectionOne(
                    this.projectId, this.projectReasonOne
            ).then(
                () => {
                    //Success
                    this.isUpdatingData = false;
                },

                () => {
                    this.isUpdatingData = false;
                }
            )
        }else {
            alert("Projet déjà approuvé ou Vous avez unz erreur de connexion...");
        }
    }

    handleFileReasonOneFileChange(event) {
        this.projectReasonOneFile = event.target.files;
    }
    onSaveProjectReasonOneImage(){

        if( this.isProjectApprouved == "none") {
            this.isUpdatingData = true;


            this.singleProjectService.uploadImageFile(
                this.projectReasonOneFile.item(0),
                "sec_one",
                this.projectId
            ).then(
                (url: string) => {

                    //console.log("In edit component big url ", url);
                    this.projectSectionOneImageUrl = url;
                    this.isUpdatingData = false;
                },

                //Error
                (error) => {
                    //handle errors
                    this.isUpdatingData = false;
                }
            );
        }else {
            alert("Projet déjà approuvé ou Vous avez unz erreur de connexion...");
        }
    }





    onSaveProjectReasonTwo(){

        if( this.isProjectApprouved == "none") {
            this.isUpdatingData = true;

            this.singleProjectService
                .updateProjectSectionTwo(
                    this.projectId, this.projectReasonTwo
            ).then(
                () => {
                    //Success
                    this.isUpdatingData = false;
                },

                () => {
                    this.isUpdatingData = false;
                }
            )
        }else {
            alert("Projet déjà approuvé ou Vous avez unz erreur de connexion...");
        }
    }



    handleFileReasonTwoFileChange(event) {
        this.projectReasonTwoFile = event.target.files;
    }

    onSaveProjectReasonTwoImage(){

        if( this.isProjectApprouved == "none") {
            this.isUpdatingData = true;

            this.singleProjectService.uploadImageFile(
                this.projectReasonTwoFile.item(0),
                "sec_two",
                this.projectId
            ).then(
                (url: string) => {

                    //console.log("In edit component big url ", url);
                    this.projectSectionTwoImageUrl = url;
                    this.isUpdatingData = false;
                },

                //Error
                (error) => {
                    //handle errors
                    this.isUpdatingData = false;
                }
            );
        }else {
            alert("Projet déjà approuvé ou Vous avez unz erreur de connexion...");
        }
    }

    onSaveProjectReasonThree(){

        if( this.isProjectApprouved == "none") {
            this.isUpdatingData = true;

            this.singleProjectService
                .updateProjectSectionThree(
                    this.projectId, this.projectReasonThree
            ).then(
                () => {
                    //Success
                    this.isUpdatingData = false;
                },

                () => {
                    this.isUpdatingData = false;
                }
            )
        }else {
            alert("Projet déjà approuvé ou Vous avez unz erreur de connexion...");
        }
    }

    handleFileReasonThreeFileChange(event) {
        this.projectReasonThreeFile = event.target.files;
    }
    onSaveProjectReasonThreeImage(){

        if( this.isProjectApprouved == "none") {
            this.isUpdatingData = true;

            this.singleProjectService.uploadImageFile(
                this.projectReasonThreeFile.item(0),
                "sec_three",
                this.projectId
            ).then(
                (url: string) => {

                    //console.log("In edit component big url ", url);
                    this.projectSectionThreeImageUrl = url;

                    this.isUpdatingData = false;
                },

                //Error
                (error) => {
                    //handle errors
                    this.isUpdatingData = false;
                }
            );
        }else {
            alert("Projet déjà approuvé ou Vous avez unz erreur de connexion...");
        }
    }

    onSaveProjectReasonFour(){

        if( this.isProjectApprouved == "none") {
            this.isUpdatingData = true;

            this.singleProjectService
                .updateProjectSectionFour(
                    this.projectId, this.projectReasonFour
            ).then(
                () => {
                    //Success
                    this.isUpdatingData = false;
                },

                () => {
                    this.isUpdatingData = false;
                }
            )
        }else {
            alert("Projet déjà approuvé ou Vous avez unz erreur de connexion...");
        }
    }

    handleFileReasonFourFileChange(event) {
        this.projectReasonFourFile = event.target.files;
    }
    onSaveProjectReasonFourImage(){

        if( this.isProjectApprouved == "none") {
            this.isUpdatingData = true;

            this.singleProjectService.uploadImageFile(
                this.projectReasonFourFile.item(0),
                "sec_four",
                this.projectId
            ).then(
                (url: string) => {

                    //console.log("In edit component big url ", url);
                    this.projectSectionFourImageUrl = url;

                    this.isUpdatingData = false;
                },

                //Error
                (error) => {
                    //handle errors
                    this.isUpdatingData = false;
                }
            );
        }else {
            alert("Projet déjà approuvé ou Vous avez unz erreur de connexion...");
        }
    }

}
