import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Project } from '../../models/Project.model';
import firebase from 'firebase';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';
import { HttpClient } from '@angular/common/http';
import { SaigeEmailService } from '../http/saige-email.service';





@Injectable({
  providedIn: 'root'
})
export class ProjectsService {


    projects: Project[] = [];
    adminAllProjects: Project[] = [];
    projectsSubject = new Subject<Project[]>();
    currentUserUId: string;
    projectsConverter: any;
    isFinishToLoadData: boolean;
    isAdminFinishToLoadData: boolean;


    newProjectUrl: string = "https://www.saige-financialplateform.com/notify-new-project"; //"http://localhost:3000/notify-new-project";

    constructor(
        //inject http client
        private http: HttpClient,
        private httpEmailService: SaigeEmailService
    ) { 

        this.isFinishToLoadData = false;
        this.isAdminFinishToLoadData = false;

        
        
        
        // Firestore data converter
        this.projectsConverter = {
        toFirestore: function(project: Project) {
            return {
                id: project.id,
                name: project.name,
                description: project.description,
                duration: project.duration,
                video_link: project.video_link,
                banner_img: project.banner_img,
                profuct_img: project.product_img,
                approuved: project.approuved,
                domain: project.domain,
                currency: project.currency,
                user_uid: this.currentUserUId,
                money_wanted: project.money_wanted,
                money_earned: project.money_earned,
                created_at: project.created_at
            }
        },
        fromFirestore: function(snapshot, options){
            const data = snapshot.data(options);
            return new Project(
                data.id,
                data.location,
                data.name,
                data.description,
                data.duration,
                data.video_link,
                data.banner_img,
                data.profuct_img,
                data.approuved,
                data.domain,
                data.currency,
                data.user_uid,
                data.money_wanted,
                data.money_earned,
                data.created_at,
                data.summary,
                data.organisation,
                data.sec_one,
                data.sec_one_img,
                data.sec_two,
                data.sec_two_img,
                data.sec_three,
                data.sec_three_img,
                data.sec_four,
                data.sec_four_img  
            );
        }
        }
    }


    emitProjects() {
        this.projectsSubject.next(this.projects);
    }


    saveProjects() {
        firebase.firestore().collection("projects").add(
        {

        });
    }

    createProject(project: Project, successCallback: any, errorCallback: any) {
        
        this.currentUserUId = firebase.auth().currentUser.uid;
        
        firebase.firestore().collection("projects").add(
        {
            name: project.name,
            type: project.type,
            location: project.location,
            description: project.description,
            duration: project.duration,
            video_link: project.video_link,
            banner_img: project.banner_img,
            product_img: project.product_img,
            approuved: project.approuved,
            domain: project.domain,
            currency: project.currency,
            user_uid: this.currentUserUId,
            money_wanted: project.money_wanted,
            money_earned: project.money_earned,
            created_at: project.created_at,
            summary:project.summary,
            organisation:project.organisation,
            sec_one:project.sec_one,
            sec_one_img:project.sec_one_img,
            sec_two:project.sec_two,
            sec_two_img:project.sec_two_img,
            sec_three:project.sec_three,
            sec_three_img:project.sec_three_img,
            sec_four:project.sec_four,
            sec_four_img:project.sec_four_img,    
        }

        ).then( (docRef) => {
            


            this.httpEmailService.postData(
                this.newProjectUrl,
                {
                    project_name: project.name,
                    message: ""
                }
            );

            successCallback(docRef.id);
            

        } ).catch( (error) => {
            errorCallback();
        });

        /*this.projects.push( newProject );
        this.saveProjects();
        this.emitProjects();*/
    }

    createProjectFromFirestore(data){
        return new Project(
        data.id,
        data.type,
        data.location,
        data.name,
        data.description,
        data.duration,
        data.video_link,
        data.banner_img,
        data.profuct_img,
        data.approuved,
        data.domain,
        data.currency,
        data.user_uid,
        data.money_wanted,
        data.money_earned,
        data.created_at,
        data.summary,
        data.organisation,
        data.sec_one,
        data.sec_one_img,
        data.sec_two,
        data.sec_two_img,
        data.sec_three,
        data.sec_three_img,
        data.sec_four,
        data.sec_four_img    
        );
    };


    getDatas() {
        return this.projects;
    }

    /**
     * Get the current user projects list
     */
    async getProjectsByUserUid(uid: string){
        this.currentUserUId = firebase.auth().currentUser.uid; //"tfuNvJkvhRSia3xY3WcrsMn44cp2"; //;
        return new Promise(
        async (resolve, reject) => {
            //console.log("Getting data");
            let projectsRef = firebase.firestore().collection("projects");
            const snapshot = await projectsRef.where("user_uid", "==", this.currentUserUId).get();
        
            snapshot.forEach(doc => {
            let p = this.createProjectFromFirestore( doc.data() );
            p.id = doc.id;
            this.projects.push(p);
            //console.log(doc.id, '=>', doc.data());
            });
        
            this.isFinishToLoadData = true;
            resolve(this.projects);
        }
        );
    

        /*
        //Define different level of accessing ressource
        firebase.firestore().collection("projects").where("user_uid", "==", this.currentUserUId)
        .withConverter(this.projectsConverter)
        .get()
        .then( (querySnapshot) => {
            querySnapshot.forEach( (doc) => {
                // doc.data() is never undefined for query doc snapshots
                
                let p = this.projectsConverter.fromFirestore( doc.data );
                userProjects.push(p);

                //console.log(userProjects, p, doc.data());
            });

            getCallback(userProjects);
        })
        .catch(function(error) {
            //console.log("Error getting documents: ", error);
        });*/


    }





    //[START Admin dashboard]
    async getAdminAllProjects() {

        
        //console.log("Getting data fro admin");
        let projectsRef = firebase.firestore().collection("projects");
        const snapshot = await projectsRef.get();
    
        snapshot.forEach(doc => {
        let p = this.createProjectFromFirestore( doc.data() );
        p.id = doc.id;
        this.adminAllProjects.push(p);

        //console.log(doc.id, '=>', doc.data());
        });

        this.isAdminFinishToLoadData = true;
            
    }


    getAdminDatas() {
        return this.adminAllProjects;
    }
    //[STOP Admin dashboard]


  
}
