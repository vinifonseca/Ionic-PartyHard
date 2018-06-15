import { newUser } from './../../interfaces/newUser.interface';
import { DB_URL } from './../../environment';
import { marker } from './../../interfaces/markers.interface';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class MongoDbProvider {

  constructor(private http: Http) {
  }

  async addMarker(marker: marker): Promise<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let body = new URLSearchParams();
    body.set('name', marker.name);
    body.set('description', marker.description);
    body.set('type', marker.point.type);
    body.set('coordinates1', String(marker.point.coordinates[0]));
    body.set('coordinates2', String(marker.point.coordinates[1]));

    const response = await this.http.post(DB_URL + '/partys',
      body.toString(), { headers: headers }).toPromise();

    return response.json()
  }

  async getAllMarkers(lat, lng): Promise<any> {
    let options = new RequestOptions({
      params: {
        lat: String(lat),
        lng: String(lng),
        limit: '10', //mock
        distance: '1000', //mock
      }
    });
    const resp = await this.http.get(DB_URL + '/partysInRegion', options).toPromise()
    return resp.json()
  }

  async createAccount(newUser: newUser): Promise<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let body = new URLSearchParams();
    body.set('password', newUser.Password);
    body.set('email', newUser.Email);

    const response = await this.http.post(DB_URL + '/accounts',
      body.toString(), { headers: headers }).toPromise();

    return response
  }

  async getAuth(credentials): Promise<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let body = new URLSearchParams();
    body.set('email', credentials.email);
    body.set('password', credentials.password);

    const response = await this.http.post(DB_URL + '/auth',
      body.toString(), { headers: headers }).toPromise();

    return response
  }

}