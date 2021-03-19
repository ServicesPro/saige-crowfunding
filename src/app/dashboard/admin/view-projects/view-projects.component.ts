import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/Project.model';
import { ProjectsService } from 'src/app/services/database/projects.service';

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.css']
})
export class ViewProjectsComponent implements OnInit {

  projects: any[] = [];

  constructor(
    private projectsService: ProjectsService,
    private router: Router
  ) { }

  ngOnInit(): void {
      this.projectsService.getAdminAllProjects().then(
        (data) => {
          this.projects = this.projectsService.getAdminDatas().map( (el) => el );
          
        }
      );
  }


  onCheckProject(id){
    //console.log(id);
    this.router.navigate(['/auth/dashboard/admin/check-project', id]);
  }

}
