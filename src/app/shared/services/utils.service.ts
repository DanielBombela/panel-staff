import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }


isString(value:any):boolean{
    return typeof value === 'string';
}

objectToFormData(obj: any): FormData {
    const formData = new FormData();
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            formData.append(key, value);
        }
    }
    return formData;
}

}
