import { Component, OnInit } from '@angular/core';

import firebase from 'firebase/app';
import 'firebase/firestore';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {


    projectItems: any[] = [];
    isLoadingFinished; boolean;
    firestore: any;

    constructor() { 

        this.firestore = firebase.firestore().collection("projects");

        this.firestore.where('approuved', "==", "accept")
        .limit(10).get()
                .then(
                    (docs) => {
                        docs.forEach(
                            (doc) => {
                                let project = {id: doc.id, data: doc.data()};
                                this.projectItems.push( project);
                    
                            }
                        );

                        this.isLoadingFinished = true;
                    }
            );


    }

    ngOnInit(): void {
    }


    getProjectsByDomain(domain: string) {

        this.isLoadingFinished = false;
        this.projectItems.length = 0;

        
        this.firestore.where("domain", "==", domain).
        where('approuved', "==", "accept").limit(10).get()
        .then(
            (docs) => {
                docs.forEach(
                    (doc) => {
                        let project = {id: doc.id, data: doc.data()};
                            this.projectItems.push( project);
                    
                        }
                    );

                    this.isLoadingFinished = true;
                }
        );

    }




}
