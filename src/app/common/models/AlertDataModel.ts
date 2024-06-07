export interface AlertConfigModel {
  data: AlertDataModel,
  panelClass?: string;
  disableClose?: boolean;
}

export interface AlertDataModel {
  title?: string;
  message: string;
  confirmText: string;
  cancelText?: string;
}

