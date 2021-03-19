import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EncrytStorageService } from '../security/encryt-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PrivateProjectGuardService {

    constructor(
        private router: Router,
        private secureStorageService: EncrytStorageService) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise(
            (resolve, reject) => {
                let granted = this.secureStorageService.getData("saige-tr");

                if(granted){
                    resolve(true);
                }else {
                    this.router.navigate(['/private-project/check']);
                    resolve(false);
                }
            }
        );
    }
}
