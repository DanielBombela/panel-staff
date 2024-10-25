import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup,  ReactiveFormsModule,  Validators } from '@angular/forms';
import { MATERIAL_MODULES } from '../../shared/material/material.imports';
import { UserService } from '../../shared/services/users.service';
import { ConfirmDialogService } from '../../shared/services/confirm-dialog.service';
import { AuthResponse } from '../../core/models/authResponse';
import { LoadingService } from '../../shared/services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule,MATERIAL_MODULES],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export default class AuthComponent {



  
  loginForm:FormGroup;
  constructor(private _formBuilder:FormBuilder, private user:UserService, private loading:LoadingService, private route:Router, private ConfirmDialog:ConfirmDialogService){
    this.initForm();
  }
   
   confirm(){
    this.ConfirmDialog.ConfirmDialog(
      '¿Seguro que desea rechazar el registro?',
      () => {
        alert("aaaa")
      },
      () => {}
    );
   }
  initForm(){
    this.loginForm = this._formBuilder.group({
      username:['hmcdcarlos14',[Validators.required]],
      password:['Canela243.',[Validators.required]],
    })
  }
  
   login_onClick(){
    const{username,password} = this.loginForm.value;
       this.loading.show();
    this.user.login( username, password ).subscribe({
      next: (response: AuthResponse) => {
    
      this.loading.hide();
      this.route.navigateByUrl("/panel/instances");
      },
      error: (responseError: any) => {
     //   this._loadingService.setLoading(false);
     this.loading.hide();
      },
    });
   }
  
  
}
