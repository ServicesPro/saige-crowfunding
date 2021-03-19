import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';



class SigninUser {
	constructor(
		public email: string,
		public password: string,
	  ) {  }
}


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, AfterViewInit {

    signinForm: FormGroup;
    errorMessage: string;
    isAuthing: boolean;
    hasErrors: boolean;

    email: string;
    password: string;

    model: SigninUser;

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

    ) { 
            this.isAuthing = false;
            this.hasErrors = false;
            this.model = new SigninUser("", "");
    }


    


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
        this.signinForm = this.formBuilder.group({
            
            email: ['email', [Validators.required, Validators.email]],
            password: ['mot de passe', [Validators.required, Validators.pattern(/[0-9a-zA-Z@=\-èé#_)(&"'ç.{%}]{6,}/),]]
            

        });
    }

    onResetPassword() {
        this.router.navigate(['/reset-password']);
    }

    onSubmit() {
            this.hasErrors = false;
            this.isAuthing = true;
            

            this.email = this.signinForm.get('email').value;
            this.password = this.signinForm.get('password').value;
            
            this.authService.signInUser(this.email, this.password).then(
                () => {
                this.router.navigate(['/dashboard']);
                },
                (error) => {
                this.hasErrors = true;
                this.isAuthing = false;
                    this.errorMessage = error;
                }
            );
    }

    goBack() {
        this.router.navigate(['/home']);
    }

}
