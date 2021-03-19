import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { SaigeCheckoutService } from 'src/app/services/http/payment/saige-checkout.service';



@Component({
  selector: 'app-contribute-oarams',
  templateUrl: './contribute-oarams.component.html',
  styleUrls: ['./contribute-oarams.component.css']
})
export class ContributeOaramsComponent implements OnInit {

    project: any;
    project_uid: string;
    isLoading: boolean;

    @Input()
    amount: number = 1;

    @Input()
    name: string = "";

    @Input()
    email: string = "";


    isCreatingSession: boolean = false;
    hasErrors: boolean = false;
    
    constructor(
        private route: ActivatedRoute,
        private checkoutService: SaigeCheckoutService
    ) { 
        this.isLoading = true;

        if (firebase.auth().currentUser){

            //Get the user here
            firebase.firestore().collection("users").where("email", "==", firebase.auth().currentUser.email)
            .get()
            .then(
                (docs) => {

                    if(docs.empty){

                    }else{
                        
                        docs.forEach(
                            (doc) => {
                                let data = doc.data();

                                this.email = data.email;
                                this.name = data.name;
                            }
                        )
                    }
                }
            )
        }
    }


    ngOnInit(): void {
        const id = this.route.snapshot.params['id'];
        this.isCreatingSession = false;

        firebase.firestore().collection('projects').doc(id).get()
            .then(
                (doc) => {
                    //console.log(doc.data() );

                    this.project = doc.data();
                    this.project_uid = doc.id; //This will serve for save payment detail
                    this.isLoading = false;
                }
            );
    }

   
    
    onPay() {

        this.hasErrors = false;

        if( this.email.length > 6 && this.email.includes("@") && this.name.length > 3 ){

            //console.log(this.email, this.name, this.amount);
            this.isCreatingSession = true;

            this.checkoutService.checkOutPayment(
                this.amount,
                this.name,
                this.email,
                {
                    name    : this.project.name,
                    img_url: this.project.banner_img,
                    uid: this.project_uid

                },

                () => {
                    this.isCreatingSession = false;
                    this.hasErrors = true;
                }
            );

        }else{
            this.hasErrors = true;
        }
        
    }

}
