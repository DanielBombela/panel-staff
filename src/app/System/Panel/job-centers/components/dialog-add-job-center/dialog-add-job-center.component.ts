import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MATERIAL_MODULES } from '../../../../../shared/material/material.imports';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Companie } from '../../../intances/interfaces/instance.interface';
import { CompaniesService } from '../../../intances/services/instances.service';
import { LoadingService } from '../../../../../shared/services/loading.service';
import { showMessage } from '../../../../../shared/utils/utilities';
import { TYPE_MESSAGE } from '../../../../../core/enums/type-message.enum';

@Component({
  selector: 'app-dialog-add-job-center',
  standalone: true,
  imports: [ReactiveFormsModule,MATERIAL_MODULES],
  templateUrl: './dialog-add-job-center.component.html',
  styleUrl: './dialog-add-job-center.component.scss'
})
export class DialogAddJobCenterComponent implements OnInit{
  Form: FormGroup;
Companie:Companie;
  constructor(private formBuilder: FormBuilder, private loading:LoadingService, private companiesService:CompaniesService,  @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogAddJobCenterComponent>) {
    this.initForm();
  }

  initForm(){
  this.Form =  this.formBuilder.group({
      name: ['', [Validators.required]],
      company: ['', ],
    });
  }

ngOnInit(): void {
   
    this.Companie = this.data.Companie;
}
  close() {
    this.dialogRef.close();
  }
  
  addJobCenter(){
let data = {
  name:this.Form.value.name,
  company:this.Companie.id,
  code_phone:"+52"
}

this.loading.show();
this.companiesService.addJobCenter(data).subscribe({
  next: (response: any) => {
this.close(),

 this.loading.hide();
  },
  error: (e)=>{
  
    this.loading.hide();
   // this.router.navigateByUrl("/panel/companies")
  }
});


  }

}
