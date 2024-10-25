import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  isloading$ = new Subject<boolean>();
  constructor() {

   }

    show():void {
      this.isloading$.next(true);
    }

    hide():void {
      this.isloading$.next(false);
    }
}
