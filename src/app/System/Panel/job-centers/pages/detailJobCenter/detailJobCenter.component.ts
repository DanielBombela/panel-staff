import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { JobCenter } from '../../interfaces/jobCenters.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CompaniesService } from '../../../intances/services/instances.service';
import { LoadingService } from '../../../../../shared/services/loading.service';
import { showMessage } from '../../../../../shared/utils/utilities';
import { TYPE_MESSAGE } from '../../../../../core/enums/type-message.enum';
import { MATERIAL_MODULES } from '../../../../../shared/material/material.imports';
import { ReactiveFormsModule } from '@angular/forms';
import { InformationJobCenterComponent } from '../../components/Tabs/information-job-center/information-job-center.component';

@Component({
  selector: 'app-detail-job-center',
  standalone: true,
  imports: [
    CommonModule,
    MATERIAL_MODULES,
    ReactiveFormsModule,
    InformationJobCenterComponent
],
  templateUrl: './detailJobCenter.component.html',
  styleUrl: './detailJobCenter.component.css',
})

export default class DetailJobCenterComponent implements OnInit {

  JobCenter:JobCenter;
constructor(private route:ActivatedRoute, private router:Router,private companiesService:CompaniesService, private loading:LoadingService){

}
      ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
        let idJobCenter= params.get('idJobCenter');
        this.getJobCenterById(idJobCenter);
        });
     
  //this.getJobCenterById(id);
      }

      getJobCenterById(idJobcenter:string){
        this.JobCenter = undefined;
        this.loading.show();
     
        this.companiesService.getJobCenterById(idJobcenter).subscribe({
          next: (response: JobCenter) => {
          this.JobCenter = response;
            this.loading.hide();
          // this.Companie = response;
     
          },
          error: (e)=>{
            showMessage(TYPE_MESSAGE.DANGER,"No se encontró centro de trabajo")
            this.loading.hide();
           // this.router.navigateByUrl("/panel/companies")
          }
        });
      }
 }


 