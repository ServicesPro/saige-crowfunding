import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/Project.model';
import { ProjectsService } from 'src/app/services/database/projects.service';
import { EncrytStorageService } from 'src/app/services/security/encryt-storage.service';


import firebase from  'firebase/app';
import 'firebase';

@Component({
  selector: 'app-saige-user-new-project',
  templateUrl: './saige-user-new-project.component.html',
  styleUrls: ['./saige-user-new-project.component.css']
})
export class SaigeUserNewProjectComponent implements OnInit {

    projectForm: FormGroup;
    model: Project;
    isCreatingPost: boolean;
    hasErrors: boolean;
    hasSuccess: boolean;
    isLoading: boolean;


    isVip: boolean = false;
    privateProject: boolean = false;


    countryList:    string[] = [
        "Algeria",
        "Angola",
        "Benin",
        "Botswana",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cameroon",
        "Central African Republic (CAR)",
        "TChad",
        "Comoros",
        "Congo, Democratic Republic of the",
        "Congo, Republic of the",
        "Cote d'Ivoire",
        "Djibouti",
        "Egypt",
        "Equatorial Guinea",
        "Eritrea",
        "Eswatini (formerly Swaziland)",
        "Ethiopia",
        "Gabon",
        "Gambia",
        "Ghana",
        "Guinea",
        "Guinea-Bissau",
        "Kenya",
        "Lesotho",
        "Liberia",
        "Libya",
        "Madagascar",
        "Malawi",
        "Mali",
        "Mauritania",
        "Mauritius",
        "Morocco",
        "Mozambique",
        "Namibia",
        "Niger",
        "Nigeria",
        "Rwanda",
        "Sao Tome and Principe",
        "Senegal",
        "Seychelles",
        "Sierra Leone",
        "Somalia",
        "South Africa",
        "South Sudan",
        "Sudan",
        "Tanzania",
        "Togo",
        "Tunisia",
        "Uganda",
        "Zambia",
        "Zimbabwe",
    ];


    constructor(
        private fromBuilder: FormBuilder,
        private projectsService: ProjectsService,
        private router: Router,
        private _location: Location,
        private secureStorageService: EncrytStorageService
    ) { 

        this.isCreatingPost = false;
        this.hasErrors = false;
        this.hasSuccess = false;
        this.isLoading = false;


        
        this.isVip = this.secureStorageService.getData("saige-tr");

        
    }
        

    ngOnInit(): void {
        this.initForm();
    }


    initForm() {

        
        
        this.model = new Project(
        "", //id
        "public",
        "", //loccation
        "", //name
        "", //escription: string ="",
        0, //duration: number = 0,
        "", //video_link: string = "",
        "", //banner_img: string = "",
        "", //profuct_img: string = "",
        "none", //approuved: boolean = false,
        "", //domain: string = "",
        "", //currency: string = "",
        "", //user_uid: string = "",
        0,//money_wanted: number = 0,
        0,//money_earned: number = 0,
        new Date,//created_at: Date,
        "", //summary: string,
        "", //organisation: string,
        "",//sec_one: string,
        "",//sec_one_img: string,
        "",//sec_two: string,
        "",//sec_two_img: string,
        "", //sec_three: string,
        "",//sec_three_img: string,
        "",//sec_four: string,
        "",//sec_four_img: string,    
        );
        

        
        this.projectForm = this.fromBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            location: ['', Validators.required],
            duration: ['', Validators.required],
            domain: ['', Validators.required],
            currency: ['', Validators.required],
            money_wanted: ['', Validators.required],
        });
    }


    handleVipDocref(ref: string) {

    }


    onSaveProject() {

        this.isCreatingPost = true;
        this.isLoading = true;


        if(this.isVip && this.privateProject) {

            this.model.type = "private";  

        }


        //console.log( this.model );

        /*const project = new Project(name, description);
        //console.log(project);*/
        this.projectsService.createProject(
        this.model,
        () => {


            //If vip set project to 

            
            this.isCreatingPost = true;
            this.hasSuccess = true;
            this.isLoading = false;
        },
        () => {
            //console.log("Errors");
            this.hasErrors = true;
            this.isCreatingPost = true;
            this.isLoading = false
        } );
    }

    onGoBack() {
       
        this.router.navigate([ '/dashboard'])
    }

}
