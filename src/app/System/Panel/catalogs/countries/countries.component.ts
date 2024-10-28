import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { Country } from '../interfaces/country.interfaces';
import { LoadingService } from '../../../../shared/services/loading.service';
import { CatalogsService } from '../services/catalogs.service';
import { MATERIAL_MODULES } from '../../../../shared/material/material.imports';
import { ConfirmDialogService } from '../../../../shared/services/confirm-dialog.service';
import { showMessage } from '../../../../shared/utils/utilities';
import { TYPE_MESSAGE } from '../../../../core/enums/type-message.enum';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateCountryComponent } from './components/add-update-country/add-update-country.component';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [MATERIAL_MODULES],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss'
})
export default class CountriesComponent {
  constructor(private catalogs:CatalogsService,  private dialog: MatDialog, private ConfirmDialog:ConfirmDialogService, private loading:LoadingService, private route:Router,){

  }
  Country: Country [] = [];
  CountryFilter: Country [] = [];
  displayedColumns: string[] = ['name', 'code_country', 'coin_country', 'symbol_country','Acciones'];
  ngOnInit(): void {
   
    this.getCountrys();
  }

  getCountrys() {
    this.loading.show();
 
    this.catalogs.getCountry().subscribe({
      next: (response: Country[]) => {
        this.Country = response;
        console.log(response);
        
        this.CountryFilter =  response;
        this.loading.hide();
      },
    });
  }

  searchCountry(event:any) {
    this.CountryFilter = this.Country;
    
    const value = (event.target as HTMLInputElement).value;


    if (value == '') {
      this.CountryFilter=this.Country;
    } else {
      
  this.CountryFilter = this.Country.filter((item) => {
    return item.name.toUpperCase().includes(value.toUpperCase());
  });

    }

  }

  addUpdateCountry(Country:Country){

    const dialog = this.dialog.open(AddUpdateCountryComponent, {
      disableClose: true,
      hasBackdrop: true,
      width: '33em',
      data:{
      Country
      }
    });

    dialog.afterClosed().subscribe((result: any) => {

  
       this.getCountrys();





    });
  }

  deleteCountry(Country:Country){
    this.ConfirmDialog.ConfirmDialog(
      '¿Seguro que desea eliminar el registro ' + Country.name + '?',
      () => {

      
        this.loading.show();
        this.catalogs.deleteCountry(Country.id).subscribe({
          next: (response: any) => {
this.getCountrys();
      
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
  



}
