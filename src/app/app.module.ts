// Angular Library Modules 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Third Party Modules
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'

// App Modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicaitonNavigationBarComponent } from './Partial/applicaiton-navigation-bar/applicaiton-navigation-bar.component';
import { HomeModule } from './home/home.module';
import { ServerTypeModule } from './MasterComponents/ServerType/server-type.module';
import { ServerDetailModule } from './MasterComponents/ServerDetail/server-detail.module';
import { UserLoginModule } from './user-login/user-login.module';
import { ProjectModule } from './MasterComponents/project/project.module';
import { ProjectDocumentsModule } from './MasterComponents/Project/project-documents/project-documents.module';
import { DocumentTypeModule } from './MasterComponents/document-type/document-type.module';
import { ProjectServerModule } from './MasterComponents/Project/project-server/project-server.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { AboutComponent } from './about.component';

@NgModule({
  declarations: [
    AppComponent,
    ApplicaitonNavigationBarComponent,
    PageNotFoundComponent,
    AboutComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HomeModule,
    NgbModule,
    ServerTypeModule,
    ServerDetailModule,
    UserLoginModule,
    ProjectModule,
    ProjectDocumentsModule,
    DocumentTypeModule,
    ProjectServerModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
