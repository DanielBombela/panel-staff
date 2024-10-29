import { Component, OnDestroy, OnInit, computed, inject } from '@angular/core';
import { MATERIAL_MODULES } from '../../../../shared/material/material.imports';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CompaniesService } from '../../intances/services/instances.service';
import { LoadingService } from '../../../../shared/services/loading.service';
import { Companie } from '../../intances/interfaces/instance.interface';
import { showMessage } from '../../../../shared/utils/utilities';
import { TYPE_MESSAGE } from '../../../../core/enums/type-message.enum';
import { JobCenter, ResponseJobCenter } from '../interfaces/jobCenters.interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddJobCenterComponent } from '../components/dialog-add-job-center/dialog-add-job-center.component';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';

@Component({
  selector: 'app-job-centers',
  standalone: true,
  imports: [MATERIAL_MODULES,    RouterLink,
    RouterModule,],
  templateUrl: './job-centers.component.html',
  styleUrl: './job-centers.component.scss'
})
export default class JobCentersComponent implements OnInit, OnDestroy {

totalDatos:number = 0;
  Companie:Companie;
  JobCenters:JobCenter[] = [];
  JobCentersFilter:JobCenter[] = [];
  JobCenterName:string =  "";
  public currentPage: number = 1;
  sidenavWidth = computed(() => ('380px'));
  private subscription: Subscription;

  constructor(private LocalStorageService:LocalStorageService, private route:ActivatedRoute, private dialog: MatDialog, private router:Router, private companiesService:CompaniesService, private loading:LoadingService){

  }
ngOnInit(): void {

  const id = this.route.snapshot.paramMap.get('idInstance');

  this.getCompanieById(id);

     // Suscribirse a las notificaciones de recarga
     this.subscription = this.companiesService.refreshJobCenters$.subscribe(() => {
      this.getCompanieById(id);
    });
  
}

ngOnDestroy(): void {
 // this.LocalStorageService.removeItem("company");
  // Limpia la suscripción al destruir el componente
 // this.subscription.unsubscribe();
}
  getCompanieById(idCompanie:string){
    this.loading.show();
 
    this.companiesService.getCompanieById(idCompanie).subscribe({
      next: (response: Companie) => {
        this.loading.hide();
       this.Companie = response;
     this.getJobCentersByCompanie();
      },
      error: (e)=>{
        showMessage(TYPE_MESSAGE.DANGER,"No se encontró compañía")
        this.loading.hide();
        this.router.navigateByUrl("/panel/companies")
      }
    });
  }

  getJobCentersByCompanie(){
    this.loading.show();
 
    this.companiesService.getJobCentersByCompanie(this.Companie.id,this.currentPage).subscribe({
      next: (response: ResponseJobCenter) => {
     this.totalDatos = response.total;
     this.JobCenters = response.items;
     this.JobCentersFilter = response.items;
     this.currentPage =  response.page;
     this.loading.hide();
      },
      error: (e)=>{
        showMessage(TYPE_MESSAGE.DANGER,"No se encontraron centros de trabajo")
        this.loading.hide();
       // this.router.navigateByUrl("/panel/companies")
      }
    });
  }


selectJobCenter(item:JobCenter){
  this.JobCenterName = ' - ' +  item.name;
}

geturlItem(item:JobCenter):string{

  return `/panel/instance/${this.Companie.id}/jobcenter/${item.id}`
}


searchJobCenter(event:any) {
  this.JobCentersFilter = this.JobCenters;
  
  const value = (event.target as HTMLInputElement).value;


  if (value == '') {
    this.JobCentersFilter=this.JobCenters;
  } else {
    
this.JobCentersFilter = this.JobCenters.filter((item) => {
  return item.name.toUpperCase().includes(value.toUpperCase());
});

  }

}


  addJobCenter(){
    const dialog = this.dialog.open(DialogAddJobCenterComponent, {
      disableClose: true,
      hasBackdrop: true,
      data:{
        Companie:this.Companie,
      
      },
        width:"30em"
    });

    dialog.afterClosed().subscribe((result: any) => {
      this.getJobCentersByCompanie();
    });
  }

  nextPage() {
    if (this.hasNextPage()) {
      this.currentPage++;
      this.getJobCentersByCompanie();
    }
  }

  // Método para ir a la página anterior
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getJobCentersByCompanie();
    }
  }

  // Método para verificar si hay una siguiente página
  hasNextPage(): boolean {
    return this.currentPage * 10 < this.totalDatos;
  }
  
  // Método para verificar si hay una página anterior
  hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }
}
