import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class ToastsProvider {

  constructor(private toastCtrl: ToastController) {

  }

  toastSucess(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      cssClass: "toast-success",
    });
    toast.present();
  }

  toastFail(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'bottom',
      cssClass: "toast-fail",
    });
    toast.present();
  }

}
