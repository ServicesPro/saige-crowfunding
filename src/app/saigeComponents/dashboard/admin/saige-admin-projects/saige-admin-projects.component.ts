import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/database/projects.service';

@Component({
  selector: 'app-saige-admin-projects',
  templateUrl: './saige-admin-projects.component.html',
  styleUrls: ['./saige-admin-projects.component.css']
})
export class SaigeAdminProjectsComponent implements OnInit {

  projects: any[] = [];

  constructor(
    private projectsService: ProjectsService,
    private router: Router
  ) { }

  ngOnInit(): void {

      new Promise(
        (resolve, reject) => {
          this.projectsService.getAdminAllProjects().then(
            (data) => {
              this.projects = this.projectsService.getAdminDatas().map( (el) => el );
              
            }
          );
        }
      ).catch( (error: any) => {

      });
      
  }

  compressDescription(desc: string) {

    if (desc.length > 40) {
        return desc.slice(0, 40) + "...";
    }else{
        return desc;
    }
} 

  onCheckProject(id){
    //console.log(id);
    //this.router.navigate(['/auth/dashboard/admin/check-project', id]);
    this.router.navigate(['/dashboard', { outlets: { userDashboard: ['admin', 'check-project', id] } }]);
  }

}
