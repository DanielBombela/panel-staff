import { Component, OnInit, inject } from '@angular/core';
import { toast } from 'ngx-sonner';
import { ShowToast } from '../../../shared/utils/utilities';
import { CompaniesService } from './services/instances.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { Companie } from './interfaces/instance.interface';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { MATERIAL_MODULES } from '../../../shared/material/material.imports';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-intances',
  standalone: true,
  imports: [LoadingComponent,MATERIAL_MODULES],
  templateUrl: './intances.component.html',
  styleUrl: './intances.component.scss',
})
export default class IntancesComponent implements OnInit {

  constructor(private loading:LoadingService,private LocalStorageService:LocalStorageService, private route:Router,private companiesService:CompaniesService){

  }
  Companies: Companie [] = [];
  CompaniesFilter: Companie [] = [];
  ngOnInit(): void {
   
    this.getCompanies();
  }

  getCompanies() {
    this.loading.show();
 
    this.companiesService.getCompanies().subscribe({
      next: (response: Companie[]) => {
        this.Companies = response;
        this.CompaniesFilter =  response;
        this.loading.hide();
 
      },
    });
  }

  searchCompanie(event:any) {
    this.CompaniesFilter = this.Companies;
    
    const value = (event.target as HTMLInputElement).value;


    if (value == '') {
      this.CompaniesFilter=this.Companies;
    } else {
      
  this.CompaniesFilter = this.Companies.filter((item) => {
    return item.name.toUpperCase().includes(value.toUpperCase()) || item.country.name.toUpperCase().includes(value.toUpperCase());
  });

    }

  }

  viewCompanie(companie:Companie){
    this.LocalStorageService.setItem("company", companie);

    this.route.navigateByUrl("/panel/instance/" + companie.id);
  }
}
