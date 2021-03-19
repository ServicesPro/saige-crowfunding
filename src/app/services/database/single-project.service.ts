import { Injectable } from '@angular/core';


import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class SingleProjectService {

    singleProjectData: any;
    uploadTask: firebase.storage.UploadTask;
    smallImageUrl: string;
    bigImageUrl: string

    constructor() { }


    getSingleProjectByUid(uid: string){

        return new Promise(
            (resolve, reject) => {
                let docu = firebase.firestore().collection('projects').doc(uid);
                docu.get().then(
                    (doc) => {
                        if(doc.exists){
                            //console.log("Found document", doc.data(), doc.id);
                            this.singleProjectData = doc.data();
                            resolve(  this.singleProjectData  );
                        }else {
                            //console.log("Not found document");
                            reject();
                        }
                    }
                ).catch(
                    function(error) {
                        //console.log(error);
                        reject(error);
                    }
                );
            }
        );

    }


    getSingleProjetData(){
        return this.singleProjectData;
    }



    //Update functions
    updateProjectName(uid:string, value: any){
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection("projects")
                    .doc(uid)
                    .update(
                        {
                            name: value
                        }
                    ).then(
                        () => {
                            //We successfully update the document
                            resolve();
                        }
                    ).catch(
                        (error) => {
                            //console.log(error);
                        }
                    )
            }
        );
    }

    updateProjectDescription(uid:string, value: any){
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection("projects")
                    .doc(uid)
                    .update(
                        {
                            desciption: value
                        }
                    ).then(
                        () => {
                            //We successfully update the document
                            resolve();
                        }
                    ).catch(
                        (error) => {
                            //console.log(error);
                        }
                    )
            }
        );
    }

    updateProjectDuration(uid:string, value: any){
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection("projects")
                    .doc(uid)
                    .update(
                        {
                            duration: value
                        }
                    ).then(
                        () => {
                            //We successfully update the document
                            resolve();
                        }
                    ).catch(
                        (error) => {
                            //console.log(error);
                        }
                    )
            }
        );
    }

    updateProjectDomain(uid:string, value: any){
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection("projects")
                    .doc(uid)
                    .update(
                        {
                            domain: value
                        }
                    ).then(
                        () => {
                            //We successfully update the document
                            resolve();
                        }
                    ).catch(
                        (error) => {
                            //console.log(error);
                        }
                    )
            }
        );
    }

    updateProjectCurrency(uid:string, value: any){
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection("projects")
                    .doc(uid)
                    .update(
                        {
                            desciption: value
                        }
                    ).then(
                        () => {
                            //We successfully update the document
                            resolve();
                        }
                    ).catch(
                        (error) => {
                            //console.log(error);
                        }
                    )
            }
        );
    }

    updateProjectAmount(uid:string, value: any){
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection("projects")
                    .doc(uid)
                    .update(
                        {
                            money_wanted: value
                        }
                    ).then(
                        () => {
                            //We successfully update the document
                            resolve();
                        }
                    ).catch(
                        (error) => {
                            //console.log(error);
                        }
                    )
            }
        );
    }

    updateProjectVideoLink(uid:string, value: any){
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection("projects")
                    .doc(uid)
                    .update(
                        {
                            video_link: value
                        }
                    ).then(
                        () => {
                            //We successfully update the document
                            resolve();
                        }
                    ).catch(
                        (error) => {
                            //console.log(error);
                        }
                    )
            }
        );
    }



    updateProjectSmallImageUrl(uid:string, value: any){
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection("projects")
                    .doc(uid)
                    .update(
                        {
                            product_img: value
                        }
                    ).then(
                        () => {
                            //We successfully update the document
                            resolve();
                        }
                    ).catch(
                        (error) => {
                            //console.log(error);
                        }
                    )
            }
        );
    }


    updateProjectBigImageUrl(uid:string, value: any){
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection("projects")
                    .doc(uid)
                    .update(
                        {
                            banner_img: value
                        }
                    ).then(
                        () => {
                            //We successfully update the document
                            resolve();
                        }
                    ).catch(
                        (error) => {
                            //console.log(error);
                        }
                    )
            }
        );
    }


    updateProjectSummary(uid:string, value: any){
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection("projects")
                    .doc(uid)
                    .update(
                        {
                            summary: value
                        }
                    ).then(
                        () => {
                            //We successfully update the document
                            resolve();
                        }
                    ).catch(
                        (error) => {
                            //console.log(error);
                        }
                    )
            }
        );
    }

    updateProjectOrganisation(uid:string, value: any){
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection("projects")
                    .doc(uid)
                    .update(
                        {
                            organisation: value
                        }
                    ).then(
                        () => {
                            //We successfully update the document
                            resolve();
                        }
                    ).catch(
                        (error) => {
                            //console.log(error);
                        }
                    )
            }
        );
    }


    //Updating sections
    updateProjectSectionOne(uid:string, value: any){
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection("projects")
                    .doc(uid)
                    .update(
                        {
                            sec_one: value
                        }
                    ).then(
                        () => {
                            //We successfully update the document
                            resolve();
                        }
                    ).catch(
                        (error) => {
                            //console.log(error);
                        }
                    )
            }
        );
    }

    updateProjectSectionOneImage(uid:string, value: any){
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection("projects")
                    .doc(uid)
                    .update(
                        {
                            sec_one_img: value
                        }
                    ).then(
                        () => {
                            //We successfully update the document
                            resolve();
                        }
                    ).catch(
                        (error) => {
                            //console.log(error);
                        }
                    )
            }
        );
    }





    updateProjectSectionTwo(uid:string, value: any){
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection("projects")
                    .doc(uid)
                    .update(
                        {
                            sec_two: value
                        }
                    ).then(
                        () => {
                            //We successfully update the document
                            resolve();
                        }
                    ).catch(
                        (error) => {
                            //console.log(error);
                        }
                    )
            }
        );
    }

    updateProjectSectionTwoImage(uid:string, value: any){
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection("projects")
                    .doc(uid)
                    .update(
                        {
                            sec_two_img: value
                        }
                    ).then(
                        () => {
                            //We successfully update the document
                            resolve();
                        }
                    ).catch(
                        (error) => {
                            //console.log(error);
                        }
                    )
            }
        );
    }


    updateProjectSectionThree(uid:string, value: any){
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection("projects")
                    .doc(uid)
                    .update(
                        {
                            sec_three: value
                        }
                    ).then(
                        () => {
                            //We successfully update the document
                            resolve();
                        }
                    ).catch(
                        (error) => {
                            //console.log(error);
                        }
                    )
            }
        );
    }

    updateProjectSectionThreeImage(uid:string, value: any){
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection("projects")
                    .doc(uid)
                    .update(
                        {
                            sec_three_img: value
                        }
                    ).then(
                        () => {
                            //We successfully update the document
                            resolve();
                        }
                    ).catch(
                        (error) => {
                            //console.log(error);
                        }
                    )
            }
        );
    }



    updateProjectSectionFour(uid:string, value: any){
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection("projects")
                    .doc(uid)
                    .update(
                        {
                            sec_four: value
                        }
                    ).then(
                        () => {
                            //We successfully update the document
                            resolve();
                        }
                    ).catch(
                        (error) => {
                            //console.log(error);
                        }
                    )
            }
        );
    }

    updateProjectSectionFourImage(uid:string, value: any){
        return new Promise(
            (resolve, reject) => {
                firebase.firestore().collection("projects")
                    .doc(uid)
                    .update(
                        {
                            sec_four_img: value
                        }
                    ).then(
                        () => {
                            //We successfully update the document
                            resolve();
                        }
                    ).catch(
                        (error) => {
                            //console.log(error);
                        }
                    )
            }
        );
    }

    





    //[START iploading image functiond]
    uploadImageFile(file: File, imgType: string, projectId: string) {

        let storageRef = firebase.storage().ref();
        let date = new Date();

        this.uploadTask = storageRef.child('projets/' + projectId + "_" + date.getTime()+'.jpg' ).put(file);

        

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
        
                                //update the projet file url
                                //switch according to the type of image to upload

                                if(imgType == "small"){
                                    this.updateProjectSmallImageUrl(projectId, url)
                                        .then(
                                            () => {
                                                //Wehave successfully upload the image
                                                //console.log("Sucess image upload", url);
                                                this.smallImageUrl = url;
                                                //Success made
                                                resolve(this.smallImageUrl);
                                            },
            
                                            (error) => {
                                                //console.log("Error when getting the download url");
                                            }
                                        );
                                }else if (imgType == "big"){
                                    this.updateProjectBigImageUrl(projectId, url)
                                        .then(
                                            () => {
                                                //Wehave successfully upload the image
                                                //console.log("Sucess image upload", url);
                                                this.smallImageUrl = url;
                                                //Success made
                                                resolve(this.smallImageUrl);
                                            },
            
                                            (error) => {
                                                //console.log("Error when getting the download url");
                                            }
                                        );
                                }else if (imgType == "sec_one"){
                                    this.updateProjectSectionOneImage(projectId, url)
                                        .then(
                                            () => {
                                                //Wehave successfully upload the image
                                                //console.log("Sucess image upload", url);
                                                this.smallImageUrl = url;
                                                //Success made
                                                resolve(this.smallImageUrl);
                                            },
            
                                            (error) => {
                                                //console.log("Error when getting the download url");
                                            }
                                        );
                                }else if (imgType == "sec_two"){
                                    this.updateProjectSectionTwoImage(projectId, url)
                                        .then(
                                            () => {
                                                //Wehave successfully upload the image
                                                //console.log("Sucess image upload", url);
                                                this.smallImageUrl = url;
                                                //Success made
                                                resolve(this.smallImageUrl);
                                            },
            
                                            (error) => {
                                                //console.log("Error when getting the download url");
                                            }
                                        );
                                }else if (imgType == "sec_three"){
                                    this.updateProjectSectionThreeImage(projectId, url)
                                        .then(
                                            () => {
                                                //Wehave successfully upload the image
                                                //console.log("Sucess image upload", url);
                                                this.smallImageUrl = url;
                                                //Success made
                                                resolve(this.smallImageUrl);
                                            },
            
                                            (error) => {
                                                //console.log("Error when getting the download url");
                                            }
                                        );
                                }else if (imgType == "sec_four"){
                                    this.updateProjectSectionFourImage(projectId, url)
                                        .then(
                                            () => {
                                                //Wehave successfully upload the image
                                                //console.log("Sucess image upload", url);
                                                this.smallImageUrl = url;
                                                //Success made
                                                resolve(this.smallImageUrl);
                                            },
            
                                            (error) => {
                                                //console.log("Error when getting the download url");
                                            }
                                        );
                                }
        
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


}
