import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class SaigeEmailService {

    email: any;

    constructor(
        private http: HttpClient
    ) { 
        this.email = firebase.auth().currentUser.email 
    }

    postData(url: string, data: any) {

        let options = {headers: {'Content-Type': 'application/json'}};


            this.http.post(url, {
                email: this.email,
                data: data
            }, options).toPromise()
            .then(
                (data) => {
                    //console.log(data);
                }
            )
    }

    postDataWithEmail(email: string, url: string, data: any) {

        let options = {headers: {'Content-Type': 'application/json'}};


            this.http.post(url, {
                email: email,
                data: data
            }, options).toPromise()
            .then(
                (data) => {
                    //console.log(data);
                }
            )
    }
}
