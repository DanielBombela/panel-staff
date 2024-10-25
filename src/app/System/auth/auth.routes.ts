import { Routes } from "@angular/router";

export default [
    {
        path:'',
        loadComponent: () => import('./auth.component')
    }
] as Routes