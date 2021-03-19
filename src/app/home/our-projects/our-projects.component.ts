import { Component, OnInit } from '@angular/core';




import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-our-projects',
  templateUrl: './our-projects.component.html',
  styleUrls: ['./our-projects.component.css']
})
export class OurProjectsComponent implements OnInit {


    projects: any[] = [];
    isLoadingFinished: boolean;

    constructor() {

        //Get four projects for the firestore
        //TODO later be collection for home project to make easy
        //access


        /*/*firebase.firestore().collection("home_projects").limit(4).get()
            .then(
                (docs) => {
                    docs.forEach(
                        (doc) => {

                            //Each doc contain the project uid to load on
                            //page
                            let p_uid = doc.data().project_uid;

                            firebase.firestore().collection('projects').doc(p_uid).get()
                            .then(
                                (doc) => {
                                    let project = {id: doc.id, data: doc.data()};
                                    this.projects.push( project);
                                }
                            )
                            
                
                        }
                    );

                    this.isLoadingFinished = true;
                }
        );*/

    }

    ngOnInit(): void {
    }

}
