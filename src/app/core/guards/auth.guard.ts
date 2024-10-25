import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../shared/services/users.service';
import { catchError, map, of, tap } from 'rxjs';

import { authStatus } from '../models/auth-status.enum';
import { LocalStorageService } from '../../shared/services/local-storage.service';


export const privateGuard: CanActivateFn = (route, state) => {
  const _storage = inject(LocalStorageService);
  const user = inject(UserService);
  const router = inject(Router);
  const tokenValido = user.validarToken()
  
  if(!tokenValido){
    _storage.clear();
    router.navigateByUrl('/login');
    return tokenValido;
  }
    

return tokenValido;
};






export const publicGuard: CanActivateFn = (route, state) => {

  const user = inject(UserService);

  const router = inject(Router);
  const tokenValido = user.validarToken()
  console.log("******");
  console.log(tokenValido);

if(tokenValido){
  router.navigateByUrl("/");
  return false;
}

return true;
};




