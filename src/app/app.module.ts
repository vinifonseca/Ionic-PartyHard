import { CreateAccountPage } from './../pages/create-account/create-account';
import { Geolocation } from '@ionic-native/geolocation';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Network } from '@ionic-native/network';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';


import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MongoDbProvider } from '../providers/fireBaseCalls/fireBaseCalls';
import { ToastsProvider } from '../providers/toasts/toasts';
import { LoginPage } from '../pages/login/login';
import { AlertsProvider } from '../providers/alerts/alerts';
import { CreateMarkerPage } from '../pages/create-marker/create-marker';

@NgModule({
  declarations: [
    LoginPage,
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    CreateAccountPage,
    CreateMarkerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LoginPage,
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    CreateAccountPage,
    CreateMarkerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MongoDbProvider,
    ToastsProvider,
    AlertsProvider,
  ]
})
export class AppModule { }
