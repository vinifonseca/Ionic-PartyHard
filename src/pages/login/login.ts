import { MongoDbProvider } from './../../providers/fireBaseCalls/fireBaseCalls';
import { CreateAccountPage } from './../create-account/create-account';
import { ToastsProvider } from './../../providers/toasts/toasts';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, LoadingController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };

  constructor(private modalCtrl: ModalController, private toastProv: ToastsProvider,
    private nav: NavController,
    private loadingCtrl: LoadingController,
    private dbProv: MongoDbProvider,
    private storage: Storage) {
  }


  createAccount() {
    let profileModal = this.modalCtrl.create(CreateAccountPage, {});
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }


  async login() {
    try {
      const result = await this.dbProv.getAuth(this.registerCredentials)
      if (result) {
        this.storage.set('token', result.token);
        // this.storage.get('token').then((val) => {
        //   console.log('Your age is', val);
        // });

        this.showLoading();
        this.nav.setRoot(TabsPage);
      }
    }
    catch (e) {
      console.error(e);

      let msg = e.message;
      if (e.code == 'auth/user-not-found') {
        msg = 'User not found'
      }
      else if (e.code == 'auth/wrong-password') {
        msg = 'Wrong password'
      }
      else if (e.code == 'auth/invalid-email') {
        msg = 'Email format invalid'
      }
      this.toastProv.toastFail(msg)
    }
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
}
