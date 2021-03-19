import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase/app';
import'firebase/auth';


@Component({
  selector: 'app-saige-user-change-password',
  templateUrl: './saige-user-change-password.component.html',
  styleUrls: ['./saige-user-change-password.component.css']
})
export class SaigeUserChangePasswordComponent implements OnInit {

  updatePasswordForm: FormGroup;
    isUpdating: boolean;
    errorMessage: string;
    hasError: boolean;
    hasSuccess: boolean;



    constructor(
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.initForm();
    }

    initForm(){
            this.updatePasswordForm = this.formBuilder.group({
                
                password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/), Validators.minLength(6)] ],
                new_password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/), Validators.minLength(6)] ],
                new_password_confirm: ['', [Validators.required]]

            });
    }

    onSubmit() {

        this.isUpdating = false;

        const password = this.updatePasswordForm.get('password').value;
        const new_password = this.updatePasswordForm.get('new_password').value;
        const new_password_confirm = this.updatePasswordForm.get('new_password_confirm').value;


        if( new_password === new_password_confirm && new_password !== password){
            
            let user = firebase.auth().currentUser;
            if(user) {
                this.isUpdating = true;
                this.hasError = false;
                this.hasSuccess = false;
                let credentials = firebase.auth.EmailAuthProvider.credential(user.email, password);
                user.reauthenticateWithCredential(credentials).then(
                    () => {

                        //console.log("password match");

                        user.updatePassword(new_password).then(
                            () => {
                                //Reauth the user
                                let cred = firebase.auth.EmailAuthProvider.credential(user.email, new_password);
                                user.reauthenticateWithCredential(cred).then(
                                    () => {
                                        this.isUpdating = false;
                                        this.hasSuccess = true;
                                    }
                                );
                                
                            }
                        ).catch( (error) => {
                            this.isUpdating = false;
                            this.hasError = true;
                            this.errorMessage = "Une erreu est survenue";
                        } );

                       
                    }
                ).catch((error) => {
                    this.isUpdating = false;
                    this.hasError = true;
                    this.errorMessage = "Mot de passe incorrect"
                })

            }

        }else{
            this.hasError = true;
            this.errorMessage = "mots de passe ne correspondent pas...";
        }
    }

}
