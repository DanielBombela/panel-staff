import { Component, Input, OnInit, inject } from '@angular/core';
import { JobCenter } from '../../../interfaces/jobCenters.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MATERIAL_MODULES } from '../../../../../../shared/material/material.imports';
import { ConfirmDialogService } from '../../../../../../shared/services/confirm-dialog.service';
import { LoadingService } from '../../../../../../shared/services/loading.service';
import { CompaniesService } from '../../../../intances/services/instances.service';
import { Location } from '@angular/common';
import { showMessage } from '../../../../../../shared/utils/utilities';
import { TYPE_MESSAGE } from '../../../../../../core/enums/type-message.enum';
import { UtilsService } from '../../../../../../shared/services/utils.service';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../../../../../shared/services/local-storage.service';
@Component({
  selector: 'app-information-job-center',
  standalone: true,
  imports: [ReactiveFormsModule, MATERIAL_MODULES],
  templateUrl: './information-job-center.component.html',
  styleUrl: './information-job-center.component.scss'
})
export class InformationJobCenterComponent implements OnInit  {
  @Input() JobCenter: JobCenter;

  Form: FormGroup;

  constructor(private LocalStorageService:LocalStorageService, private route:ActivatedRoute, private location: Location, private utils:UtilsService, private formBuilder: FormBuilder,private ConfirmDialog:ConfirmDialogService, private loading:LoadingService, private companiesService:CompaniesService,) {

  }
ngOnInit(): void {
    this.initForm();



}
  initForm(){
  this.Form =  this.formBuilder.group({
      name: ['', [Validators.required]],
      address: [''],
      agreement: [''],
      business_name: [''],
      company: ['', [Validators.required]],
      email: ['', [Validators.email]],
      facebook: [''],
      health_manager: [''],
      id: [''],
      license_number: [''],
      messenger: [''],
      phone: [''],
      sanitary_license: [''],
      recommendations: [''],
      taxpayer_registration: [''],
      web_page: [''],
      whatsapp: [''],
      code_phone: ['+52'],
      job_center: ''
    });
    this.patchForm();
  }

  patchForm(){
    let item = this.JobCenter;

    
    this.Form.patchValue({
      name:item.name,
      address: item.address,
      agreement:item.agreement,
      business_name: item.business_name,
      company:this.LocalStorageService.getItem("company").id, //this.UserService.Company.id,
      email: item.email,
      facebook: item.facebook,
      health_manager: item.health_manager,
      id: item.id,
      license_number: item.license_number,
      messenger: item.messenger,
      phone: item.phone,
      sanitary_license:item?.sanitary_license ?? '',
      recommendations: item.recommendations,
      taxpayer_registration: item.taxpayer_registration,
      web_page: item.web_page,
      whatsapp: item.whatsapp,
      code_phone:'+52'
    });
  }

  deleteJobCenter(){
    this.ConfirmDialog.ConfirmDialog(
      '¿Seguro que desea eliminar el centro trabajo ' + this.JobCenter.name + '?',
      () => {

      
        this.loading.show();
        this.companiesService.deleteJobCenter(this.JobCenter.id).subscribe({
          next: (response: any) => {
          this.companiesService.notifyJobCentersRefresh(true);
          this.location.back();
          this.loading.hide();
            showMessage(TYPE_MESSAGE.SUCCESS,"Eliminado correctamente");
         
          },
          error: (e)=>{
          
            this.loading.hide();
           // this.router.navigateByUrl("/panel/companies")
          }
        });
        
      },
      () => {}
    );
   }
  


   update(){
   
    if(this.utils.isString(this.Form.value.sanitary_license)){

      delete this.Form.value.sanitary_license;
    }

this.loading.show();
    this.companiesService.patchJobCenter(this.utils.objectToFormData(this.Form.value),this.Form.value.id).subscribe((res)=>{
      this.loading.hide();
     showMessage(TYPE_MESSAGE.SUCCESS,"Guardado correctamente")
    
    });
  }
  
  onFileSelected(event: any): void {
    this.Form.get('sanitary_license')?.setValue(event.target.files[0]);
  }
  
  removeFile(): void {
    this.Form.patchValue({ sanitary_license: null });
  }
}
