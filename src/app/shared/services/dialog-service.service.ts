import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommonAlertComponent } from '../components/common-alert/common-alert.component';
import { AlertConfigModel } from 'src/app/common/models/AlertDataModel';

@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {

  constructor(
    private dialog: MatDialog
  ) { }

  confirmDialog(config: AlertConfigModel): Observable<boolean> {
    return this.dialog
      .open(CommonAlertComponent, {
        ...config
      })
      .afterClosed();
  }
}
