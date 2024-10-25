import { Inject, Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';

import { Router } from '@angular/router';

import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Companie } from '../interfaces/instance.interface';
import { JobCenter, ResponseJobCenter } from '../../job-centers/interfaces/jobCenters.interface';

@Injectable({ providedIn: 'root' })
export class CompaniesService {
  private readonly baseUrl: string = environment.baseUrl;
  private refreshJobCentersSubject = new BehaviorSubject<boolean>(false);
  refreshJobCenters$ = this.refreshJobCentersSubject.asObservable();

  notifyJobCentersRefresh(notify:boolean) {
    this.refreshJobCentersSubject.next(notify);
  }

  constructor(private http:HttpClient, ) {}

  getCompanies() {

    return this.http.get<Companie[]>(`${this.baseUrl}/administrative/companies/`)
  }
  getCompanieById(idCompanie:string) {

    return this.http.get<Companie>(`${this.baseUrl}/administrative/companies/${idCompanie}`)
  }
  getJobCenterById(idJobcenter:string) {

    return this.http.get<JobCenter>(`${this.baseUrl}/administrative/job-centers/${idJobcenter}`)
  }

  getJobCentersByCompanie(idCompanie:string,page:number) {

    let params = new HttpParams();
  params = params.append('page_size',  10);
   params = params.append('page', page);
    params = params.append('company', idCompanie);
    return this.http.get<ResponseJobCenter>(`${this.baseUrl}/administrative/job-centers/`,{params})
  }

  addJobCenter(data:any) {

    return this.http.post<Companie[]>(`${this.baseUrl}/administrative/job-centers/`,data)
  }

  deleteJobCenter(idJobCenter:string) {

    return this.http.delete<Companie[]>(`${this.baseUrl}/administrative/job-centers/${idJobCenter}`)
  }

  
patchJobCenter(data:any,id:string){
  return this.http.patch<any>(`${this.baseUrl}/administrative/job-centers/${id}/`,data)
}

}
