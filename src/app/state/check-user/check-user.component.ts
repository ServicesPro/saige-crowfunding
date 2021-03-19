import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Router } from '@angular/router';
import { EncrytStorageService } from 'src/app/services/security/encryt-storage.service';


@Component({
  selector: 'app-check-user',
  templateUrl: './check-user.component.html',
  styleUrls: ['./check-user.component.css']
})
export class CheckUserComponent implements OnInit {


    isChecking: boolean;
    hasErrors: boolean;
    errorMessage: string;


    userIdentifier: string;
    userPassword: string;


    constructor(
        private router: Router,
        private secureStorageService: EncrytStorageService) { }

    ngOnInit(): void {
        
    }

    onCheckUserAccess() {

        this.isChecking = true;

        firebase.firestore().collection("private_identifiers")
        .where("user_uid", "==", firebase.auth().currentUser.uid)
        .get()
        .then(
            (docs) => {

                if(docs.empty) {
                    this.isChecking = false;
                    this.errorMessage = "Vous n'avez le droit d'accéder à cette partie de la plateforme..."
                    this.hasErrors = true;
                }else {
                    docs.forEach(
                        (doc) => {

                            let data = doc.data();

                            if( data.identifier == this.userIdentifier) {
                                if(data.password == this.userPassword ) {

                                    this.isChecking = false;
                                    this.secureStorageService.setdata('saige-tr', true);

                                    //Set a timeout for clearing data
                                    setTimeout(() => {

                                        new Promise(
                                            (resolve, reject) => {
                                            
                                                //Clear data
                                                //alert("Cleaning data");
                                                this.secureStorageService.setdata('saige-tr', false);

                                            }
                                        );


                                    }, 1000 * 60 * 5);
                                    this.router.navigate(["/home/private-projects"])
                                    

                                }else {
                                    this.isChecking = false;
                                    this.errorMessage = "Vérifier votre mot de passe..."
                                    this.hasErrors = true;
                                }
                            }else {
                                this.isChecking = false;
                                this.errorMessage = "Vérifiez votre identifiant..."
                                this.hasErrors = true;
                            }
                        }
                    )
                }
               
            }
        ).catch(
            (error) => {
                this.isChecking = false;
                this.errorMessage = "Une erreur s'est produite..."
                this.hasErrors = true;
            }
        )
    }

}
