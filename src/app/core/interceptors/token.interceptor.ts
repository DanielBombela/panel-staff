import { HttpInterceptorFn } from "@angular/common/http";
import { StorageEnum } from "../enums/StorageEnum";
import { inject, runInInjectionContext } from "@angular/core";

import { finalize } from "rxjs";
import { LoadingService } from "../../shared/services/loading.service";
import { AppInjector } from "../../app.component";
import { LocalStorageService } from "../../shared/services/local-storage.service";




export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  return runInInjectionContext(AppInjector, () => {
    const _storage = inject(LocalStorageService);
    const loading = inject(LoadingService);

    const token = _storage.getItem(StorageEnum.TOKEN);

    if (token !== null) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    loading.show();

    return next(req).pipe(
      finalize(() => loading.hide())
    );
  });
};