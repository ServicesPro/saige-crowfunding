import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PrivateProjectService {

    vip: any[] = [];
    constructor() { }


    isVipUser(user_uid) {
        return new Promise(
            (resolve, reject) => {

                
                firebase.firestore().collection("private_identifiers").where("user_uid", "==", user_uid)
                .get()
                .then(
                    (docs) => {
                        
                        if(docs.empty) {
                            reject()
                        }else {
                            resolve();
                            
                        }
                    }
                 )
            }
        )
    }


    getAllVips() {

        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection("private_identifiers").get()
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
                                                    this.vip.push( doc.data() );
                                                }
                                            )
                                        }

                                        resolve(this.vip);
                                        
                                    }
                                )


                            }
                        )
                    }
                )
            }
        )

    }



    addNewVip(email, identifier: string, password: string) {


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

                                    firebase.firestore().collection('private_identifiers').add(
                                        {
                                            user_uid: doc.data().user_uid,
                                            identifier: identifier,
                                            password: password
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
                ).catch(
                    (error) => {
                        reject(error);
                    }
                )
            }
        )

        

    }



    deleteVip(user_uid) {
        
        return new Promise(
            (resolve, reject) => {

                
                firebase.firestore().collection("private_identifiers").where("user_uid", "==", user_uid)
                .get()
                .then(
                    (docs) => {
                        
                        if(docs.empty) {

                        }else {

                            docs.forEach(
                                (doc) => {
                                    

                                    //Delete the doument
                                    firebase.firestore().collection("private_identifiers").doc(doc.id)
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
