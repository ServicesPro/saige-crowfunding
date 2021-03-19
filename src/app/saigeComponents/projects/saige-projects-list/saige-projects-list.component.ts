import { Component, OnInit } from '@angular/core';

import firebase from 'firebase/app';
import 'firebase/firestore';


@Component({
  selector: 'app-saige-projects-list',
  templateUrl: './saige-projects-list.component.html',
  styleUrls: ['./saige-projects-list.component.css']
})
export class SaigeProjectsListComponent implements OnInit {

    projectItems: any[] = [];
    isLoadingFinished; boolean;
    firestore: any;
    hasData: boolean = true;

    constructor() { 

        this.firestore = firebase.firestore().collection("projects");

        this.firestore.where('type', '==', "public")
        .where('approuved', "==", "accept").limit(10).get()
                .then(
                    (docs) => {

                        if(docs.empty){
                            this.hasData = false;
                            this.isLoadingFinished = true;
                        }else {
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
        
        this.firestore
        .where("domain", "==", domain)
        .where("type", "==", "public").
        where('approuved', "==", "accept").limit(10).get()
        .then(
            (docs) => {


                if(docs.empty){
                    this.hasData = false;
                    this.isLoadingFinished = true;
                }else {
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
