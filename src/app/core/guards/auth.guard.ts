
import { Injectable } from '@angular/core';
import {CanActivate, CanLoad, Router} from '@angular/router';
import {Observable, tap} from 'rxjs';
import { UserService } from '../../shared/services/users.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate, CanLoad {

  constructor(
    private authService: UserService,
    private router: Router,
    private storage:LocalStorageService
  ) {}

  canActivate(): Observable<boolean> | boolean {
    //return true

    return this.authService.validarToken()
      .pipe(
        tap( valid =>{
          if (!valid) {
            this.storage.clear()
            this.router.navigateByUrl('/login');
          }
        })
      )

  }

  canLoad(): Observable<boolean> | boolean {
    //return true

    return this.authService.validarToken()
        .pipe(
          tap( valid =>{
            if (!valid) {
              this.storage.clear()
              this.router.navigateByUrl('/login');
            }
          })
        )

    }

}


