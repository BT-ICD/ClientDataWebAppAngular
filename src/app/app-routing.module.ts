import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { AboutComponent } from './about.component';


const routes: Routes = [
  {path:'about', component:AboutComponent},
  {
      path:'projectdeployment',
      loadChildren:()=>
        import('./Transaction/project-deployment/project-deployment.module')
        .then(m=>m.ProjectDeploymentModule)
  },
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
