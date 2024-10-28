import { Inject, Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';

import { environment } from '../../../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';


import { Country } from '../interfaces/country.interfaces';

@Injectable({ providedIn: 'root' })



export class CatalogsService {
  private readonly baseUrl: string = environment.baseUrl;



  constructor(private http:HttpClient ) {}

  getCountry() {
    return this.http.get<Country[]>(`${this.baseUrl}/administrative/catalogs/countries/`)
  }

  addCountry(data:Country) {

    return this.http.post(`${this.baseUrl}/administrative/catalogs/countries/`,data)
  }
  updateCountry(data:Country) {

    return this.http.put(`${this.baseUrl}/administrative/catalogs/countries/${data.id}/`,data)
  }

  
  deleteCountry(idCountry:string) {

    return this.http.delete(`${this.baseUrl}/administrative/catalogs/countries/${idCountry}`)
  }

  


}
