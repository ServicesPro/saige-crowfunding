import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class AdminsService {

    admins: any[] = [];
    constructor() { }


    getAllAdmins() {

        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection("admins").get()
                .then(
                    (docs) => {

                        docs.forEach(
                            (doc) => {
                                //Get the user
                                let user_uid = doc.data().user_uid;

                                firebase.firestore().collection('users').where("user_uid", "==", user_uid).get()
                                .then(
                                    (docs) => {

                                        if(docs.empty){

                                        }else {
                                            docs.forEach(
                                                (doc) => {
                                                    this.admins.push( doc.data() );
                                                }
                                            )
                                        }

                                        resolve(this.admins);
                                        
                                    }
                                )


                            }
                        )
                    }
                )
            }
        )

    }



    addNewAdministrator(email) {


        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection("users").where("email", "==", email).get()
                .then(
                    (docs) => {

                        if(docs.empty) {
                            reject();
                        }else {
                            docs.forEach(
                                (doc) => {
                                    //Add the user uid to admins collection

                                    firebase.firestore().collection('admins').add(
                                        {
                                            user_uid: doc.data().user_uid
                                        }
                                    ).then(
                                        () => {
                                            resolve();
                                        }
                                    ).catch(
                                        (error) => {
                                            reject(error);
                                        }
                                    )
                                }
                            )
                        }
                    }
                )
            }
        )

        

    }



    deleteAdmin(user_uid) {
        
        return new Promise(
            (resolve, reject) => {

                
                firebase.firestore().collection("admins").where("user_uid", "==", user_uid)
                .get()
                .then(
                    (docs) => {
                        
                        if(docs.empty) {

                        }else {

                            docs.forEach(
                                (doc) => {
                                    

                                    //Delete the doument
                                    firebase.firestore().collection("admins").doc(doc.id)
                                    .delete()
                                    .then(
                                        () => {
                                            resolve();
                                        }
                                    )


                                }
                            )
                        }
                    }
                 )
            }
        )
        

    }

}
