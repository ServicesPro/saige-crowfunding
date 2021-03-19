import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase/app';
import 'firebase/auth';
@Component({
  selector: 'app-saige-user-change-email',
  templateUrl: './saige-user-change-email.component.html',
  styleUrls: ['./saige-user-change-email.component.css']
})
export class SaigeUserChangeEmailComponent implements OnInit {

  updateEmailForm: FormGroup;
    isUpdating: boolean;
    hasSuccess: boolean;
    errorMessage: string;
    hasError: boolean;



    constructor(
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.initForm();
    }

    initForm(){
            this.updateEmailForm = this.formBuilder.group({
                
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required]]

            });
    }

    onSubmit() {

        this.isUpdating = true;
        this.hasError = false;
        this.hasSuccess = false;

        const email = this.updateEmailForm.get('email').value;
        const password = this.updateEmailForm.get('password').value;

        
        
        let user = firebase.auth().currentUser;
        const oldEmail = user.email;

        if(user) {

            let credentials = firebase.auth.EmailAuthProvider.credential(user.email, password)
            
            user.reauthenticateWithCredential(credentials).then(
                () => {
                    
                    //Password match
                    user.updateEmail(email).then(
                        () => {
                            //Sucesfully updated
        
                            //Reauth the user
                            //to avoid errors
                           
                            
                            let credentials = firebase.auth.EmailAuthProvider.credential(email, password)
                            user.reauthenticateWithCredential(credentials).then(
                                () => {

                                    //Updating the user email in firebase collections

                                    firebase.firestore().collection("users").where("email", "==", oldEmail).get()
                                        .then(
                                            (docs) => {

                                                docs.forEach( (doc) => {
                                                    
                                                    //Update the data
                                                    firebase.firestore().collection('users').doc(doc.id).update(
                                                        {
                                                            email: email
                                                        }
                                                    ).then (
                                                        () => {
                                                            this.isUpdating = false;
                                                            this.hasSuccess = true;
                                                        }
                                                    ).catch(
                                                        (error) => {
                                                            this.isUpdating = false;
                                                            //Handling errors here
                            
                                                            this.hasError = true;
                                                            this.errorMessage = "Une erreur est survenue";
                                                        }
                                                    )
                                                } )

                                            }
                                        )

                                   
                                }
                            ).catch( (erro) => {
                                this.isUpdating = false;
                                //Handling errors here

                                this.hasError = true;
                                this.errorMessage = "Une erreur est survenue";
                            } )
        
                        },
                    ).catch(
                        (error) => {
                            this.isUpdating = false;
                            //Handling errors here

                            this.hasError = true;
                            this.errorMessage = "Une erreur est survenue";
                    })

                }
            ).catch( (error) => {
                this.isUpdating = false;
                this.hasError = true;
                this.errorMessage = "Votre mot de passe est incorrect";
            } )
            
        }
    }

}
