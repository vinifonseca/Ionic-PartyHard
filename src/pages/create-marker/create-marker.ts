import { ToastsProvider } from './../../providers/toasts/toasts';
import { MongoDbProvider } from './../../providers/fireBaseCalls/fireBaseCalls';
import { marker } from './../../interfaces/markers.interface';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-create-marker',
  templateUrl: 'create-marker.html',
})

export class CreateMarkerPage {

  event;

  newmarker: marker = {
    point: {
      type: "Point",
      coordinates: [0, 0]
    },
    name: '',
    description: ''
  };

  constructor(private toastProvider: ToastsProvider, private mongoProv: MongoDbProvider, public navParams: NavParams, public viewCtrl: ViewController) {
    this.event = navParams.get('event');

    this.newmarker.point.coordinates[0] = this.event.latLng.lat();
    this.newmarker.point.coordinates[1] = this.event.latLng.lng();
  }

  ionViewDidLoad() {
  }

  close() {
    this.viewCtrl.dismiss();
  }

  async createMarker() {
    await this.mongoProv.addMarker(this.newmarker);
    this.toastProvider.toastSucess('Success to add');

    let resp = this.newmarker
    this.viewCtrl.dismiss(resp);
  }


}
