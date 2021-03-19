

import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {

   
    @Input()
    project: any; // = "yXhZrL4F7YOgkRZ7ID2r";



    totalAmount: number;

    

    constructor(
        private router: Router
    ) {
        this.totalAmount = 0;
     }

    ngOnInit(): void {
        //console.log(this.project);


        //Request all contributions on the current project
        firebase.firestore().collection("contributions").where("project_uid", "==", this.project.id)
        .get()
        .then(
            (docs) => {

                if(docs.empty) {

                }else {
                    docs.forEach(
                        (doc) => {
                            this.totalAmount += parseInt(doc.data().amount);
                        }
                    );

                    
                }

            }
        );

    }


    onViewSingleProject() {

        this.router.navigate(['/home', 'single-project', this.project.id]);
    }


    getMoneyPercent(total: number){
        ////console.log("Total ", this.totalAmount)
        return Math.round( this.totalAmount * 100 / total );
    }

  

}
