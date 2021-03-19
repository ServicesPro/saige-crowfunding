import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalVariableService } from 'src/app/services/global/global-variable.service';


import firebase  from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


@Component({
  selector: 'app-saige-second-header',
  templateUrl: './saige-second-header.component.html',
  styleUrls: ['./saige-second-header.component.css']
})
export class SaigeSecondHeaderComponent implements OnInit, AfterViewInit {

    @ViewChild("toggleMenuSpan")
    togglerButton: ElementRef = null;

    @ViewChild("menu")
    menu: ElementRef = null;

    @ViewChild("appLogo")
    appLogo: ElementRef = null;

    @ViewChild("appName")
    appName: ElementRef = null;

    @ViewChild("loginLink")
    appLoginLink: ElementRef = null;

   

    @ViewChildren("link")
    applinks:QueryList<ElementRef> = null;

    @ViewChild("navLinks")
	navLinks: ElementRef = null;
	
	

	minMenuShown: boolean = false;
	windowsRules: any = window.matchMedia('(max-width: 400px)');;
	
	isAuth: boolean = false;

    constructor(
		private authService: AuthService,
        private router: Router,
		private renderer: Renderer2,
		private globalVariable: GlobalVariableService
    ) { 

		firebase.auth().onAuthStateChanged(
            (user) => {
                if(user) {
                    this.isAuth = true;
                } else {
                    this.isAuth = false;
                   
                }
            }
        );
	}


    
	toggleMenu(event) {
        
		return true
	}

    ngAfterViewInit(): void {
		//console.log(this.togglerButton);
		//console.log(this.menu);
		//console.log(this.navLinks);
		//console.log(this.applinks);
		this.renderer.setProperty(this.navLinks.nativeElement, 'display', "none");

	  	var handleMenu = (rules) => {

			if (rules.matches) {
				//Handle click on toggler button here
				//console.log("Min width ", rules);
                this.minMenuShown = false;
                this.renderer.setProperty(this.navLinks.nativeElement, 'display', "none");
                this.renderer.setStyle(this.appLogo.nativeElement, "display", "flex");

				var toggle = () => {
					

					//console.log("Clicked", this.minMenuShown, this.navLinks.nativeElement.display);
					if(this.minMenuShown == true){
						this.renderer.setStyle(this.navLinks.nativeElement, 'display', "none");
						this.minMenuShown = false;
					}else {
						this.renderer.setStyle(this.navLinks.nativeElement, 'display', "block");
						this.minMenuShown = true;
					}

					
				}

				this.renderer.listen(
					this.togglerButton.nativeElement, 
					"click", 
					toggle
				);

				//add listener on windows
				var prevScrollpos = 0;
				window.onscroll = () => {
					var currentScrollpos = window.pageYOffset;

					if ( currentScrollpos - prevScrollpos > 15*2/3 ) {
						this.renderer.setStyle(this.appLogo.nativeElement, "display", "flex");
						
						
					}else {
						

					}
				};


			}else {
				

				//togglerButton.removeEventListener('click', toggleMenu);
				this.renderer.setStyle(this.navLinks.nativeElement, "display", "flex");

				
				
				
				
				var blueHeight = 20;
				//add listener on windows
				var prevScrollpos = 0;
				window.onscroll = () => {
					var currentScrollpos = window.pageYOffset;

					if ( currentScrollpos - prevScrollpos > blueHeight*2/3 ) {
						this.renderer.setStyle(this.appLogo.nativeElement, 'display', "none");

						if( this.appLoginLink) {
							this.renderer.setStyle(this.appLoginLink.nativeElement, 'color', "black");
						}

						
						
						for(let link of this.applinks) {
							this.renderer.setStyle(link.nativeElement, 'color', "black");
						}
						

						
						
						
						/*linksItems.forEach(
							(element) => {
								//element.style.color = '#3F93D6';
							

								//Change class name here
							}
						)*/
					}else {

						this.renderer.setStyle(this.appLogo.nativeElement, 'display', "none");
						
						if(this.appLoginLink) {
							this.renderer.setStyle(this.appLoginLink.nativeElement, 'color', "black");
						}

						for(let link of this.applinks) {
							this.renderer.setStyle(link.nativeElement, 'color', "black");
						}
						

						/*linksItems.forEach(
							(element) => {
								//element.style.color = 'white';
							}
						)*/
					}
				};
				
			}
		}
	

	
		handleMenu(this.windowsRules);
		this.windowsRules.addEventListener("change", handleMenu);

    }

    ngOnInit(): void {

	}




	onNavigateToInverstors() {
		this.globalVariable.setLocation('investors');
        this.router.navigate([ "/home/investors" ]);
	}
	
	onNavigateToDashboard() {
		this.router.navigate([ "/dashboard" ]);
    }


    onNavigateToPrivateProjets() {

		//Set the global vaiable location
		
        this.router.navigate( ['/home/private-projects'] );
    }

    onNavigateToPublicProjects() {
        this.router.navigate([ "/home/projects" ]);
    }


    onSignOut() {
        this.authService.signOutUser();
	}
	

    onNavigateToLoginOrDashboard() {
        
        if(this.isAuth) {
            this.router.navigate(['/dashboard']);
            //console.log('Already login');
        } else {
            this.router.navigate(['/auth', 'signin']);
            //console.log('need to log in');
        }

    }

}
