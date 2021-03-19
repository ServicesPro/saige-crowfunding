import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, AfterViewInit {


    signupForm: FormGroup;
    errorMessage: string;


    passwordsMatch: boolean = true;
    isAuthing: boolean;
    hasErrors: boolean;

    @ViewChild("passToggler")
    passToggler: ElementRef;

    @ViewChild("passwordField")
    passwordField: ElementRef;

    passVisible: boolean = false;


    constructor(  

        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private _location: Location,
        private renderer: Renderer2

    ) { }

    ngAfterViewInit(): void {
        var togglePassVisibility = () => {
            if(!this.passVisible) {
    
                this.renderer.setAttribute(
                    this.passToggler.nativeElement,
                    'src', 'assets/img/view.svg');
                
                    this.renderer.setAttribute(
                        this.passwordField.nativeElement,
                        'type',
                        'text'
                    )
    
                this.passVisible = true;
            }else {
                this.renderer.setAttribute(
                    this.passToggler.nativeElement,
                    'src', 'assets/img/invisible.svg');
                
                    this.renderer.setAttribute(
                        this.passwordField.nativeElement,
                        'type',
                        'password'
                    )
    
                this.passVisible = false;
            }
        }
        
        this.renderer.listen(
            this.passToggler.nativeElement,
            'click',
            togglePassVisibility)
    }

    ngOnInit(): void {
            //Init the form
            //a callback function
            this.initForm();
    }

    initForm(){
        this.signupForm = this.formBuilder.group({
            fullname: ['', [Validators.required, Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z@=\-èé#_)(&"'ç.{%}]{6,}/), Validators.minLength(6)] ],
            confirm_password: ['', [Validators.required] ],
            birthday: ['', Validators.required]

        });
    }

   

    onSubmit() {
        const email = this.signupForm.get('email').value;
        const password = this.signupForm.get('password').value;
        const confirm_password = this.signupForm.get('confirm_password').value;
        const name = this.signupForm.get("fullname").value;
        const birthday = this.signupForm.get("birthday").value;

        

        if (password === confirm_password){

            this.isAuthing = true;

            this.authService.createNewUser(email, password, name, birthday).then(
                () => {
                    this.router.navigate(['/dashboard']);
                },
                (error) => {
                    this.errorMessage = error;
                    this.hasErrors = true;
                    this.isAuthing = false;
                }
            );

        }else {
            alert("Les mots de passent ne orrespondent pas...");
            //console.log("Correct your password");

            this.passwordsMatch = false;
            this.hasErrors =true;
            this.isAuthing = false;
        }
        
        
    }

    goBack() {
        this._location.back();
    }

    goToLogin() {
        
    }

}
