import { Component, OnInit } from '@angular/core';

import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-project-private-list',
  templateUrl: './project-private-list.component.html',
  styleUrls: ['./project-private-list.component.css']
})
export class ProjectPrivateListComponent implements OnInit {

    projectItems: any[] = [];
    isLoadingFinished; boolean;

    firestore: any;;
    hasData: boolean = true;


    constructor() { 
        
        this.firestore = firebase.firestore().collection("projects");
        
        this.firestore.where('type', "==", "private").
        where('approuved', "==", "accept").limit(15).get()
                .then(
                    (docs) => {
                        

                        if(docs.empty){
                            this.hasData = false;
                            this.isLoadingFinished = true;
                        }else {
                            this.hasData = true;

                            docs.forEach(
                                (doc) => {
                                    let project = {id: doc.id, data: doc.data()};
                                    this.projectItems.push( project);
                        
                                }
                            );
        
                            this.isLoadingFinished = true;
                        }


                    }
            );


    }

    ngOnInit(): void {
       
    }



    getProjectsByDomain(domain: string) {

        this.isLoadingFinished = false;
        this.projectItems.length = 0; //Reset the data container

        //console.log(domain);
        
        this.firestore.where("domain", "==", domain).
        this.firestore.where("type", "==", "private").
        where('approuved', "==", "accept").limit(10).get()
        .then(
            (docs) => {


                if(docs.empty){
                    this.hasData = false;
                    this.isLoadingFinished = true;
                }else {
                    this.hasData = true;
                    
                    docs.forEach(
                        (doc) => {
                            let project = {id: doc.id, data: doc.data()};
                            this.projectItems.push( project);
                
                        }
                    );

                    this.isLoadingFinished = true;
                }


                
            }
        );

    }

}
