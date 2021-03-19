import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SingleProjectComponent } from './project/single-project/single-project.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { InvestorsComponent } from './investors/investors.component';
import { AdminGuardService } from './services/admin/admin-guard.service';
import { ContributeOaramsComponent } from './contributions/contribute-oarams/contribute-oarams.component';
import { ResetPasswordComponent } from './dashboard/reset-password/reset-password.component';
import { ChangeUserDataGuardService } from './services/change-user-data-guard.service';
import { CheckUserComponent } from './state/check-user/check-user.component';
import { ManagerGuardService } from './services/manager/manager-guard.service';
import { ProjectPrivateListComponent } from './project/project-private-list/project-private-list.component';
import { PrivateProjectGuardService } from './services/project/private-project-guard.service';
import { SaigeDashboardComponent } from './saigeComponents/saige-dashboard/saige-dashboard.component';
import { SaigeUserProfileComponent } from './saigeComponents/dashboard/saige-user-profile/saige-user-profile.component';
import { SaigeUserProjectsComponent } from './saigeComponents/dashboard/saige-user-projects/saige-user-projects.component';
import { SaigeUserNewProjectComponent } from './saigeComponents/dashboard/saige-user-new-project/saige-user-new-project.component';
import { SaigeUserEditProjectComponent } from './saigeComponents/dashboard/saige-user-edit-project/saige-user-edit-project.component';
import { SaigeUserChangeEmailComponent } from './saigeComponents/dashboard/saige-user-change-email/saige-user-change-email.component';
import { SaigeUserChangePasswordComponent } from './saigeComponents/dashboard/saige-user-change-password/saige-user-change-password.component';
import { SaigeAdminProjectsComponent } from './saigeComponents/dashboard/admin/saige-admin-projects/saige-admin-projects.component';
import { SaigeAdminCheckProjectComponent } from './saigeComponents/dashboard/admin/saige-admin-check-project/saige-admin-check-project.component';
import { SaigeManagerUsersComponent } from './saigeComponents/dashboard/manager/saige-manager-users/saige-manager-users.component';
import { SaigeProjectsListComponent } from './saigeComponents/projects/saige-projects-list/saige-projects-list.component';
import { PageNotFoundComponent } from './404/page-not-found/page-not-found.component';
import { SuccessComponent } from './contributions/success/success.component';
import { FailureComponent } from './contributions/failure/failure.component';


const routes: Routes = [
  { path:"auth/signup", component: SignupComponent },
  { path:"auth/signin", component: SigninComponent },
  { path:"reset-password", component: ResetPasswordComponent },
  { path:"private-project/check", component: CheckUserComponent },


  { path:"contribute/params/:id", component: ContributeOaramsComponent },
  { path:"contribute/state-success/:hash", component: SuccessComponent },
  { path:"contribute/state-cancelled", component: FailureComponent },


  { path:"home", component: HomeComponent },


  { path:"home/projects", component: SaigeProjectsListComponent },


  { path:"home/private-projects", canActivate: [PrivateProjectGuardService], component: ProjectPrivateListComponent },

  { path:"home/single-project/:id", component: SingleProjectComponent },


  { path:"home/about", component: AboutComponent },
  { path:"home/contact", component: ContactComponent},
  { path:"home/investors", component: InvestorsComponent },

  { path:"dashboard", canActivate: [ AuthGuardService ], component: SaigeDashboardComponent, 
    children: [
      { path:"", component: SaigeUserProjectsComponent, pathMatch: 'full', outlet: "userDashboard"},
      { path:"profile", component: SaigeUserProfileComponent, pathMatch: 'full', outlet: "userDashboard"},
      { path:"projects", component: SaigeUserProjectsComponent, pathMatch: 'full', outlet: "userDashboard"},
      { path:"new-project", component: SaigeUserNewProjectComponent, pathMatch: 'full', outlet: "userDashboard"},
      { path:"edit-project/:id", component: SaigeUserEditProjectComponent, pathMatch: 'full', outlet: "userDashboard"},
      { path:"update-email", canActivate: [ ChangeUserDataGuardService ], component: SaigeUserChangeEmailComponent, pathMatch: 'full', outlet: "userDashboard"},
      { path:"update-password", canActivate: [ ChangeUserDataGuardService ], component: SaigeUserChangePasswordComponent, pathMatch: 'full', outlet: "userDashboard"},

      { path:"admin/projects", canActivate: [ AdminGuardService ], component: SaigeAdminProjectsComponent, pathMatch: 'full', outlet: "userDashboard"},
      { path:"admin/check-project/:id", canActivate: [ AdminGuardService ], component: SaigeAdminCheckProjectComponent, pathMatch: 'full', outlet: "userDashboard"},

      { path:"manager/users", canActivate: [ ManagerGuardService ], component: SaigeManagerUsersComponent, pathMatch: 'full', outlet: "userDashboard"},
    ]},
  

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },



]; 

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    {
      scrollPositionRestoration: 'enabled', // Add options right here
    }), ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
