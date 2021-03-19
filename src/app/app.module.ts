import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HomeComponent } from './home/home/home.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { SingleProjectComponent } from './project/single-project/single-project.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeCarouselComponent } from './home/home-carousel/home-carousel.component';
import { IdesBlockComponent } from './home/ides-block/ides-block.component';
import { HowItWorksComponent } from './home/how-it-works/how-it-works.component';
import { OurProjectsComponent } from './home/our-projects/our-projects.component';
import { ProjectViewComponent } from './custom/project-view/project-view.component';
import { ProposeComponent } from './home/propose/propose.component';
import { WhyUsComponent } from './home/why-us/why-us.component';
import { FeedbackComponent } from './home/feedback/feedback.component';
import { ProjectMinComponent } from './dashboard/project-min/project-min.component';
import { ProjectsService } from './services/database/projects.service';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { InvestorsComponent } from './investors/investors.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatProgressSpinnerModule }  from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { SageSpinnerComponent } from './material/sage-spinner/sage-spinner.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProjectComponent } from './dashboard/edit-project/edit-project.component';
import { CheckProjectComponent } from './dashboard/admin/check-project/check-project.component';
import { ViewProjectsComponent } from './dashboard/admin/view-projects/view-projects.component';


import { AdminGuardService } from './services/admin/admin-guard.service';
import { SingleProjectService } from './services/database/single-project.service';
import { ContributeOaramsComponent } from './contributions/contribute-oarams/contribute-oarams.component';
import { ContributePayementComponent } from './contributions/contribute-payement/contribute-payement.component';
import { UpdateEmailComponent } from './dashboard/update-email/update-email.component';
import { UpdatePasswordComponent } from './dashboard/update-password/update-password.component';
import { ResetPasswordComponent } from './dashboard/reset-password/reset-password.component';
import { ChangeUserDataGuardService } from './services/change-user-data-guard.service';
import { UserService } from './services/database/user.service';
import { MessagesService } from './services/database/messages.service';
import { CheckUserComponent } from './state/check-user/check-user.component';
import { ManagerMainComponent } from './dashboard/manager/manager-main/manager-main.component';
import { AdminsService } from './services/database/manager/admins.service';
import { PrivateProjectService } from './services/manager/private-project.service';
import {  ManagerGuardService } from './services/manager/manager-guard.service';
import { ProjectPrivateListComponent } from './project/project-private-list/project-private-list.component';
import { PrivateProjectGuardService } from './services/project/private-project-guard.service';
import { EncrytStorageService } from './services/security/encryt-storage.service';
import { SaigeHeaderComponent } from './home/saige-header/saige-header.component';
import { SaigeBannerComponent } from './home/saige-banner/saige-banner.component';
import { SaigeFeaturesComponent } from './home/saige-features/saige-features.component';
import { SaigeCategoriesComponent } from './home/saige-categories/saige-categories.component';
import { SaigeHowComponent } from './home/saige-how/saige-how.component';
import { SaigeProjectsComponent } from './home/saige-projects/saige-projects.component';
import { SaigeProposeProjectComponent } from './home/saige-propose-project/saige-propose-project.component';
import { SaigeChooseComponent } from './home/saige-choose/saige-choose.component';
import { SaigeSummaryComponent } from './home/saige-summary/saige-summary.component';
import { GlobalVariableService } from './services/global/global-variable.service';
import { SaigeSecondHeaderComponent } from './saigeComponents/saige-second-header/saige-second-header.component';
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
import { SaigeEmailService } from './services/http/saige-email.service';
import { SaigeCheckoutService } from './services/http/payment/saige-checkout.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { SuccessComponent } from './contributions/success/success.component';
import { FailureComponent } from './contributions/failure/failure.component';
import { PageNotFoundComponent } from './404/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    ProjectListComponent,
    SingleProjectComponent,
    HeaderComponent,
    FooterComponent,
    HomeCarouselComponent,
    IdesBlockComponent,
    HowItWorksComponent,
    OurProjectsComponent,
    ProjectViewComponent,
    ProposeComponent,
    WhyUsComponent,
    FeedbackComponent,
    ProjectMinComponent,
    AboutComponent,
    ContactComponent,
    InvestorsComponent,
    DashboardComponent,
    SageSpinnerComponent,
    EditProjectComponent,
    CheckProjectComponent,
    ViewProjectsComponent,
    ProjectMinComponent,
    ContributeOaramsComponent,
    ContributePayementComponent,
    UpdateEmailComponent,
    UpdatePasswordComponent,
    ResetPasswordComponent,
    CheckUserComponent,
    ManagerMainComponent,
    ProjectPrivateListComponent,
    SaigeHeaderComponent,
    SaigeBannerComponent,
    SaigeFeaturesComponent,
    SaigeCategoriesComponent,
    SaigeHowComponent,
    SaigeProjectsComponent,
    SaigeProposeProjectComponent,
    SaigeChooseComponent,
    SaigeSummaryComponent,
    SaigeSecondHeaderComponent,
    SaigeDashboardComponent,
    SaigeUserProfileComponent,
    SaigeUserProjectsComponent,
    SaigeUserNewProjectComponent,
    SaigeUserEditProjectComponent,
    SaigeUserChangeEmailComponent,
    SaigeUserChangePasswordComponent,
    SaigeAdminProjectsComponent,
    SaigeAdminCheckProjectComponent,
    SaigeManagerUsersComponent,
    SaigeProjectsListComponent,
    SuccessComponent,
    FailureComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ProjectsService,
    SingleProjectService,
    AdminGuardService,
    ChangeUserDataGuardService,
    UserService,
    MessagesService,
    AdminsService,
    PrivateProjectService,
    ManagerGuardService,
    PrivateProjectGuardService,
    EncrytStorageService,
    GlobalVariableService,
    SaigeEmailService,
    SaigeCheckoutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
