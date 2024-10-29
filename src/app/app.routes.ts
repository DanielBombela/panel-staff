import { Routes } from '@angular/router';
import { ValidateTokenGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/public.guard';

export const routes: Routes = [
    {
        path:'login',
    canActivate:[LoginGuard],
      loadChildren:()=> import("./System/auth/auth.routes")
    },

    {
        path:'panel',
       canActivate:[ValidateTokenGuard],
      loadComponent:()=> import("./System/Panel/panel.component"),
      children:[
        {
            path:'instances',
           loadComponent:() =>import("./System/Panel/intances/intances.component"),
        },
      {
          path:'instance/:idInstance',
         loadComponent:() =>import("./System/Panel/job-centers/pages/job-centers.component"),
         children:[
          {
            path:'jobcenter/:idJobCenter',
            loadComponent: () => import('./System/Panel/job-centers/pages/detailJobCenter/detailJobCenter.component')
          }
         ]
      },
     
        {
            path:'countries',
           loadComponent:() =>import("./System/Panel/catalogs/countries/countries.component"),
        },
        {
            path:'status',
           loadComponent:() =>import("./System/Panel/catalogs/status/status.component"),
        },
        {
            path:'**',
            redirectTo:'instances',
          },
      ]
    },


    {
        path:'**',
        redirectTo:'panel',
      },
    {
      path:'',
      redirectTo:'panel',
      pathMatch:'full'
    },

];
