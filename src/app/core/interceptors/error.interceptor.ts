import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { showMessage } from "../../shared/utils/utilities";
import { TYPE_MESSAGE } from "../enums/type-message.enum";
import { inject, runInInjectionContext } from "@angular/core";
import { LoadingService } from "../../shared/services/loading.service";
import { AppInjector } from "../../app.component";

export const ErrorResponseInterceptor:HttpInterceptorFn = (req,next) =>
    next(req).pipe(catchError(handleErrorResponse))


const handleErrorResponse = (error: HttpErrorResponse) => {
    return runInInjectionContext(AppInjector, () => {
      const loading = inject(LoadingService);
  
      // Muestra el mensaje de error y oculta el cargador
      const errorResponse = error?.error?.message ?? 
        `Ocurrió un error, favor de ponerse en contacto con soporte técnico. Código de error: ${error?.status}`; 
  
      console.error("************************ERROR************************");
      console.error(errorResponse);
      console.error(error);
      console.error("************************ERROR************************");
  
      loading.hide();
      showMessage(TYPE_MESSAGE.DANGER, errorResponse);
  
      // Opcional: puedes mostrar otros tipos de mensaje descomentando lo siguiente:
      // showMessage(TYPE_MESSAGE.INFO, errorResponse);
      // showMessage(TYPE_MESSAGE.SUCCESS, errorResponse);
      // showMessage(TYPE_MESSAGE.WARNING, errorResponse);
      // showMessage(TYPE_MESSAGE.MESSAGE, errorResponse);
  
      return throwError(() => error);
    });
  };
