import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path:'login',
    canActivate:[publicGuard],
      loadChildren:()=> import("./System/auth/auth.routes")
    },

    {
        path:'panel',
       canActivate:[privateGuard],
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
