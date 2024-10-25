import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

const CURRENT_USER_KEY = 'CURRENT_USER';
const LOGIN_BLOCKED_KEY = 'LOGIN_BLOCKED';
export const ATM_SELECTED = 'ATM_SELECTED';
@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  constructor(public dialogo: MatDialog) {}
  public ConfirmDialog(mssj: string, fnAccept: Function, fnCancel: Function) {
    this.dialogo
      .open(ConfirmDialogComponent, {
        data: mssj,
        disableClose: true,
        hasBackdrop: true,
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          fnAccept();
        } else {
          fnCancel();
        }
      });
  }
}
