import { Injectable } from '@angular/core';



import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    uploadTask: any;
    smallImageUrl: any;
    userDocid: string;

    constructor() { 
        //Get the user doc id

        new Promise(
            (resolve, reject) => {
                let uid = firebase.auth().currentUser.uid;

                firebase.firestore().collection("users").where("user_uid", "==", uid ).get()
                    .then(
                        (docs) => {
                            //Docs won't be empty
                            docs.forEach(
                                (doc) => {
                                 this.userDocid = doc.id;
                            }
                        );
                    }
                )
            }
        );
        
    }

    setDocId() {
        let uid = firebase.auth().currentUser.uid;

        firebase.firestore().collection("users").where("user_uid", "==", uid ).get()
            .then(
                (docs) => {
                    //Docs won't be empty
                    docs.forEach(
                        (doc) => {
                            this.userDocid = doc.id;
                        }
                    );
                }
            )
    }



    //[START iploading image functiond]
    uploadUserImageFile(file: File) {

        let storageRef = firebase.storage().ref();
        let date = new Date();

        this.uploadTask = storageRef.child('users/' + this.userDocid + "_" + date.getTime()+'.jpg' ).put(file);

        

        //Return a Promise in order to handle the result

        return new Promise(

            (resolve, reject) => {
                this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                    (snapdhot) => {

                        //Update status about size uploaded
        
                    },
                    (error) => {
                        //console.log("error on uploading file");
                    },
                    () => {
                        //We have successfully uploaded the image
                        this.uploadTask.snapshot.ref.getDownloadURL()
                            .then( (url) => {
        
                                //update the userfile url
                                //switch according to the type of image to upload
                                this.updateUserImageUrl(url)
                                    .then(
                                        () => {
                                            resolve(url);
                                        },

                                        (error) => {
                                            reject(error);
                                        }
                                    )
                              
        
                            }).catch(
                                (error) => {

                                    //We have error
                                    reject(error);
                                }
                            );
                    
                    });
                }
        );    

    }


    updateUserImageUrl(url: any) {
       
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection('users').doc(this.userDocid)
                .update(
                    {
                        photo_url: url
                    }
                ).then(
                    () => {
                        resolve(url);
                    }
                ).catch(
                    (error) => {
                        reject();
                    }
                )
            }
        )
        
    }

    updateUserName(name: string, ) {
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection('users').doc(this.userDocid)
                .update(
                    {
                        name: name
                    }
                ).then(
                    () => {
                        resolve();
                    }
                ).catch(
                    (error) => {
                        reject();
                    }
                )
            }
        )
    }

    updateUserPhone(phone: string) {
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection('users').doc(this.userDocid)
                .update(
                    {
                        phone: phone
                    }
                ).then(
                    () => {
                        resolve();
                    }
                ).catch(
                    (error) => {
                        reject();
                    }
                )
            }
        )
    }
    updateUserBirthday(bithday: Date) {
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection('users').doc(this.userDocid)
                .update(
                    {
                        birthday: bithday
                    }
                ).then(
                    () => {
                        resolve();
                    }
                ).catch(
                    (error) => {
                        reject();
                    }
                )
            }
        )
    }

    updateUserAddress(adr: string) {
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection('users').doc(this.userDocid)
                .update(
                    {
                        address: adr
                    }
                ).then(
                    () => {
                        resolve();
                    }
                ).catch(
                    (error) => {
                        reject();
                    }
                )
            }
        )
    }

    



  
}
