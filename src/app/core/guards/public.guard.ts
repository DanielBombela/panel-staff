
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from '../../shared/services/local-storage.service';


/**
 * Clase para manejar guards de la aplicacionn
 */
@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  /**
   * Constructor de la clase
   * @param user
   * @param route
   * @param StorageService
   */
  constructor(
    private route: Router,
 private storage:LocalStorageService
  ) { }

  canActivate(): boolean {
    if (!this.storage.getItem("access_token")) {
      return true;
    }
    else {
      this.route.navigateByUrl("");
      return false;
    }

  }

  canLoad(): Observable<boolean> | boolean {
    if (!this.storage.getItem("access_token")) {
      return true;
    }
    else {
      this.route.navigateByUrl("");
      return false;
    }
  }
}
