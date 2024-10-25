import { toast } from 'ngx-sonner';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { TYPE_MESSAGE } from '../../core/enums/type-message.enum';


export const ShowToast = (
  icon: SweetAlertIcon,
  message: string,
  time: number = 3500
): void => {
  Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: time,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  }).fire({
    icon: icon,
    title: message,
  });
};

export const  showMessage = (TYPE:TYPE_MESSAGE = TYPE_MESSAGE.SUCCESS, MESSAGE:string) =>{
  switch ( TYPE ) {
    case TYPE_MESSAGE.SUCCESS:
      toast.success(MESSAGE)
        break;
    case TYPE_MESSAGE.INFO:
      toast.info(MESSAGE)
        break;
    case TYPE_MESSAGE.DANGER:
      toast.error(MESSAGE)
        break;
        case TYPE_MESSAGE.WARNING:
          toast.warning(MESSAGE)
            break;
    default: 
   
/***
 *     toast.custom(SignupComponent, {
      componentProps: {
        title: 'Error',
        description: MESSAGE,
      },
    });
 */
  //  toast.loading(MESSAGE)
    break;
 }

}  