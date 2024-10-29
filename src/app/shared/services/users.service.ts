import { Inject, Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { authStatus } from '../../core/models/auth-status.enum';
import { Observable, map, of, tap } from 'rxjs';
import { AuthResponse, User } from '../../core/models/authResponse';
import { Router } from '@angular/router';
import { StorageEnum } from '../../core/enums/StorageEnum';
import { isPlatformBrowser } from '@angular/common';

import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly baseUrl: string = environment.baseUrl;

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<authStatus>(authStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());
  // Inyecta el ID de plataforma
  constructor(private http:HttpClient, private route:Router, private storage:LocalStorageService, ) {}

  login(username: string, password: string) {
    const body = {
      username,
      password,
    };

    return this.http
      .post<AuthResponse>(`${this.baseUrl}/staff/authentication/login/`, body)
      .pipe(
        tap((res: AuthResponse) => {
          this._currentUser.set(res.data.user);
          this._authStatus.set(authStatus.authenticated);
             this.storage.setItem(StorageEnum.TOKEN, res.data.access_token)
            this.storage.setItem(StorageEnum.USER, res.data.user)
        
         

        }),
        map((res: AuthResponse) => res)
      );
  }

  logout() {
    this.storage.clear();
      this.route.navigateByUrl('/login');
    
 
  }



  validarToken(): Observable<boolean> {

    const token = this.storage.getItem(StorageEnum.TOKEN);
  
    if (!token) {
      this._currentUser.set(null);
      this._authStatus.set(authStatus.notAuthenticated);
      return of(false);
    }
    const user = this.storage.getItem(StorageEnum.USER);
   
    
    if (user) {
      this._currentUser.set(user);
    } else {
      this._currentUser.set(null);
    }
    this._authStatus.set(authStatus.authenticated);
  
    return of(true);
  }
}
