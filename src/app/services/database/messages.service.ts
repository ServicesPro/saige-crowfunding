import { Injectable } from '@angular/core';


import firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

    messages: any[] = [];

    constructor() { }



    getMessages(projectId: string) {
        

        //console.log("Started getting messages", projectId);


        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection('messages').where("project_uid", "==", projectId).get()
                .then(
                    (docs) => {

                        docs.forEach(
                            (doc) => {
                                this.messages.push( doc.data() );
                            }
                        )
                        resolve(this.messages);
                    },

                    (error) => {
                        //console.log(error);
                        reject(error);
                    }
                ).catch(
                    (error) => {
                        //console.log(error);
                        reject(error);
                    }
                );
            }
        )
        

    }
}
