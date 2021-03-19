import { Component, Input, OnInit } from '@angular/core';
import { AdminsService } from 'src/app/services/database/manager/admins.service';
import { PrivateProjectService } from 'src/app/services/manager/private-project.service';



@Component({
  selector: 'app-manager-main',
  templateUrl: './manager-main.component.html',
  styleUrls: ['./manager-main.component.css']
})
export class ManagerMainComponent implements OnInit {



    admins: any;
    vips: any;
    isUpdating: boolean = false;

    @Input()
    email: string;
    vipEmail: string;
    vipIdentifier: string;
    vipPassword: string;

    


    constructor(
        private adminsService: AdminsService,
        private vipServices: PrivateProjectService
    ) {
        this.admins = [];
        this.vips = [];
        this.vipEmail = "",
        this.vipIdentifier = "";
        this.vipPassword = "";
     }

    ngOnInit(): void {

        this.adminsService.getAllAdmins()
        .then(
            (data)=> {
                this.admins = data;
                
            }
        )

        this.vipServices.getAllVips()
        .then(
            (data)=> {
                this.vips= data;
            }
        )
        
    }


    onAddNewAdministrator() {

        let isAlreadyAdmin = false;

        this.admins.forEach(element => {
            if(element.email === this.email){
                //console.log("Found");
                isAlreadyAdmin = true;
            }
        });

        if(isAlreadyAdmin){
            alert("Cet email est déjà un administrateur...")
        }else {

            this.isUpdating = true;

            this.adminsService.addNewAdministrator(this.email)
            .then(
                () => {
                    this.isUpdating = false
                    alert("Admninstrateur ajouté...")
                    window.location.reload();
                },

                () => {
                    this.isUpdating = false
                    alert("Verifier l'email...");

                }
            ).catch(
                (error) => {
                    alert("Une erreur s'est produite...");
                    this.isUpdating = false
                }
            )
        }
    }



    onDeleteAdmin(doc_uid) {
        this.isUpdating = true;
        this.adminsService.deleteAdmin(doc_uid).then(
            () => {
                alert("Administrateur supprimé avec success");
                this.isUpdating = false
                window.location.reload();
            },

            () => {
                this.isUpdating = false;
            }
        )

    }


    onAddNewVip() {

        let isAlreadyVip = false;

        this.vips.forEach(element => {
            if(element.email === this.email){
                //console.log("Found");
                isAlreadyVip = true;
            }
        });

        if(isAlreadyVip){
            alert("Cet email est déjà un vip")
        }else {

            if(this.vipIdentifier.length > 0 && this.vipPassword.length > 0){

                this.isUpdating = true;

                this.vipServices.addNewVip(this.vipEmail, this.vipIdentifier, this.vipPassword)
                .then(
                    () => {
                        this.isUpdating = false
                        alert("Vip ajouté...")
                        window.location.reload();
                    },

                    () => {
                        this.isUpdating = false
                        alert("Verifier l'email...");

                    }
                ).catch(
                    (error) => {
                        alert("Une erreur s'est produite...");
                        this.isUpdating = false
                    }
                )
            }else {
                alert("Vérifier les données du vip...");
            }
        }
    }



    onDeleteVip(user_uid) {
        this.isUpdating = true;
        this.vipServices.deleteVip(user_uid).then(
            () => {
                alert("VIP supprimé avec success");
                this.isUpdating = false
                window.location.reload();
            },

            () => {
                this.isUpdating = false;
            }
        )

    }


    


    

}
