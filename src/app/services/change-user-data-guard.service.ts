import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';

import firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChangeUserDataGuardService implements CanActivate{

    constructor(private router: Router) { }

	canActivate(): Observable<boolean> | Promise<boolean> | boolean {
		return new Promise(
			(resolve, reject) => {
				firebase.auth().onAuthStateChanged(
				(user) => {
					if(user.emailVerified) {
						resolve(true);
					} else {
						this.router.navigate(['/auth', 'dashboard']);
						resolve(false);
					}
				}
				);
			}
		);
	}
}
