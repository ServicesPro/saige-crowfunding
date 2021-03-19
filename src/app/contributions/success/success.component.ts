import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
    
    amount: string;
    project_name: string;
    project_img: string;
    hash: string;
    uid: string;

    constructor(
        private route: ActivatedRoute,
        private routes: Router,
        private http: HttpClient
    ) { 
        //Request paras here
        /*this.route.queryParamMap.subscribe(
            (params) => {
                
            });*/
    }

    ngOnInit(): void {

        this.hash = this.route.snapshot.paramMap.get('hash');

        if (this.hash.length > 0) {
            
            firebase.firestore().collection("transactions").doc(this.hash).get()
            .then(
                (doc) => {

                    if( doc.exists ) {

                        const data = doc.data();

                        this.amount = data.amount;
                        this.uid = data.project_uid;
                        this.project_img = data.img;
                        this.project_name = data.pname;

                        let options = {headers: {'Content-Type': 'application/json'}};


                        //https://www.saige-financialplateform.com/
                        const url ='https://www.saige-financialplateform.com/checkout-success';

                        this.http.post(url, {
                            project_uid: this.uid,
                            amount: this.amount,
                            transaction: doc.id
                        }, options).toPromise()
                        .then(
                            (data) => {
                                    //console.log(data);
                            }
                        );
            
                

                    }else {
                        this.routes.navigate(['/home', 'projects']);
                    }
                    

                }
            );

        }else {

            this.routes.navigate(['/home', 'projects']);

        }


        
       


        

        //Update project contribution here;

        /*firebase.firestore().collection('contributions').add(
            {
                project_uid: this.uid,
                amount: this.amount
            }
        ).then(
            (docref) => {

                //console.log('success');
            }
        ).catch(
            (error) => //console.log(error)
        )*/


        

    }

}
