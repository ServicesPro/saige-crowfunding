import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    
    resetPasswordForm: FormGroup;
    isUpdating: boolean;
    hasError: boolean;
    hasSuccess: boolean;
    errorMessage: string;

    constructor(
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.initForm();
    }

    initForm(){
            this.resetPasswordForm = this.formBuilder.group({
                
                email: ['', [Validators.required, Validators.email]]

            });
    }

    onSubmit() {

        this.isUpdating = true;
        this.hasError = false;
        this.hasSuccess = false;

        const email = this.resetPasswordForm.get('email').value;
        //console.log(email);
        
        firebase.auth().sendPasswordResetEmail(email).then(
            () => {
                this.hasSuccess = true;
                this.isUpdating = false;
            }
        ).catch(
            (error) => {
                this.isUpdating = false;
                this.hasError = true;
                this.errorMessage = "Aucun utilisateur avec ce email...";
                //console.log(error)
            }
        );
        
    }

}
