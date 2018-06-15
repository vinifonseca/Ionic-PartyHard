import { CreateMarkerPage } from './../create-marker/create-marker';
import { AlertsProvider } from './../../providers/alerts/alerts';
import { MongoDbProvider } from './../../providers/fireBaseCalls/fireBaseCalls';
import { marker } from './../../interfaces/markers.interface';
import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  @ViewChild('map') mapElement;
  map: any;
  geoLat = 40.71115829255646;
  geoLng = -73.9925765991211;
  zoom = 16;
  markers: marker[] = [];

  constructor(
    public navCtrl: NavController,
    private alertsProvider: AlertsProvider,
    public modalCtrl: ModalController
  ) { }

  ionViewDidEnter() {
    this.markers = [];
    this.initMap(this.geoLat, this.geoLng);
  }

  initMap(lat, lng) {

    let latLng = new google.maps.LatLng(lat, lng);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: 'You',
      animation: google.maps.Animation.DROP,
      icon: './assets/icon/you_marker.png'
    });

    this.addMarkers();

    this.map.addListener('click', (event) => {
      this.makerPrompt(event);
    });

    var autocomplete = new google.maps.places.Autocomplete(document.getElementById("pacinput"), {});
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      try {
        var place = autocomplete.getPlace();
        this.initMap(place.geometry.location.lat(), place.geometry.location.lng())
      } catch (e) {
        console.log(e);
        this.alertsProvider.basicAlert('Location Error', 'Location not found, try again.');
      }
    });
  }

  makerPrompt(event) {
    let profileModal = this.modalCtrl.create(CreateMarkerPage, { event: event });
    profileModal.onDidDismiss(data => {
      if (data != undefined) {
        this.markers.push(data)
        this.initMap(this.geoLat, this.geoLng);
      }
    });
    profileModal.present();
  }

  addMarkers() {
    for (let i = 0; i < this.markers.length; i++) {
      var data = this.markers[i];
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.markers[i].point.coordinates[0], this.markers[i].point.coordinates[1]),
        animation: google.maps.Animation.DROP,
        map: this.map,
        title: this.markers[i].name,
        icon: './assets/icon/red_circle.png',
      });

      var infoWindow = new google.maps.InfoWindow();

      (function (marker, data) {
        google.maps.event.addListener(marker, "click", function (e) {
          infoWindow.setContent(
            "<h3 class='center'>" + data.name + "</h3> <div style = 'width:200px;min-height:40px;font-size:16px'>" + data.description + "</div>"
          );
          infoWindow.open(this.map, marker);
        });
      })(marker, data);
    }
  }

}
