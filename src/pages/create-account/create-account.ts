import { MongoDbProvider } from './../../providers/fireBaseCalls/fireBaseCalls';
import { TabsPage } from './../tabs/tabs';
import { newUser } from './../../interfaces/newUser.interface';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {

  newUser: newUser = {
    Password: '',
    Email: '',
  }
  confirmPassW: string;

  constructor(public dbProv: MongoDbProvider, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {

  }

  async createAcc() {
    try {
      const result = await this.dbProv.createAccount(this.newUser)
      if (result) {
        let resp = this.newUser
        this.viewCtrl.dismiss(resp);
      }
    } catch (e) {
      console.error(e);
    }

  }

  close() {
    let resp = this.newUser
    this.viewCtrl.dismiss(resp);
  }

}
