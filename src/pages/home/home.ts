import { CreateMarkerPage } from './../create-marker/create-marker';
import { AlertsProvider } from './../../providers/alerts/alerts';
import { marker } from './../../interfaces/markers.interface';
import { MongoDbProvider } from './../../providers/fireBaseCalls/fireBaseCalls';
import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

// import { Geolocation } from '@ionic-native/geolocation'; 

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild('map') mapElement;
  map: any;
  geoLat = 40.71115829255646;
  geoLng = -73.9925765991211;
  zoom = 16;
  markers: marker[] = [];

  constructor(
    private mongoProv: MongoDbProvider,
    public navCtrl: NavController,
    private alertsProvider: AlertsProvider,
    public modalCtrl: ModalController
  ) { }

  ionViewDidEnter() {
    this.initMap(this.geoLat, this.geoLng);
  }

  initMap(lat, lng) {
    // this.geolocation.getCurrentPosition().then((position) => {
    // if (position.coords.longitude != undefined && position.coords.latitude != undefined) {
    //   this.geoLng = position.coords.longitude;
    //   this.geoLat = position.coords.longitude;
    // }

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

  async addMarkers() {
    this.markers = await this.mongoProv.getAllMarkers(this.geoLat, this.geoLng);

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
            "<div class='conteiner'>" +
            "<h3 class='title'>" + data.name + "</h3>" +
            "<div class='contentBox'>" + data.description + "</div>" +
            "<img src='./assets/icon/red_circle.png' alt='Smiley face' height='42' width='42'>" +
            "</div>"
          );
          infoWindow.open(this.map, marker);
        });
      })(marker, data);
    }
  }


}