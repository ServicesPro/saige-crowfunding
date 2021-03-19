import { AfterViewInit, ElementRef, Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SingleProjectService } from 'src/app/services/database/single-project.service';


import firebase from 'firebase/app';
import 'firebase/firestore';


@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.css']
})
export class SingleProjectComponent implements OnInit, AfterViewInit {


    @Input()
    projectId: string = "yXhZrL4F7YOgkRZ7ID2r";

    //Handle the project document got
    project: any;
    user: any;


    //Images containers
    @ViewChild("projectBannerImg", { read: ElementRef })
    projectBannerImage: ElementRef;

    @ViewChild("projectYoutube", { read: ElementRef })
    projectYoutube: ElementRef;


    @ViewChild("projectSectionOneImage", { read: ElementRef })
    projectSectionOneImage: ElementRef;

    @ViewChild("projectSectionTwoImage", { read: ElementRef })
    projectSectionTwoImage: ElementRef;

    @ViewChild("projectSectionThreeImage", { read: ElementRef })
    projectSectionThreeImage: ElementRef;

    @ViewChild("projectSectionFourImage", { read: ElementRef })
    projectSectionFourImage: ElementRef;
    
    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private singleProjectService: SingleProjectService
    ) {
        
        this.project = {name: ""};
     }



    ngAfterViewInit(): void {
        this.projectBannerImage.nativeElement.setAttribute('src', this.project.banner_img);
        this.projectYoutube.nativeElement.setAttribute('src', this.project.video_link);

        this.projectSectionOneImage.nativeElement.setAttribute('src', this.project.sec_one_img);
        this.projectSectionTwoImage.nativeElement.setAttribute('src', this.project.sec_two_img);
        this.projectSectionThreeImage.nativeElement.setAttribute('src', this.project.sec_three_img);
        this.projectSectionFourImage.nativeElement.setAttribute('src', this.project.sec_four_img);
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


    getSectionOneImg() {
        return this.project.sec_on_img;
    }



    onContribute() {
        this.router.navigate(['contribute/params', this.projectId]);
    }

}
