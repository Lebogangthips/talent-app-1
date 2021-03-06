import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseProvider} from '../providers/firebase/firebase';
import { HomePage } from  '../pages/home/home'
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ScoutPage} from '../pages/scout/scout'

import { UsersPage } from '../pages/users/users';
import { LogoutPage } from '../pages/logout/logout';
import { ArtisthomePage } from '../pages/artisthome/artisthome';
import { ScouteProfilePage } from '../pages/scoute-profile/scoute-profile';
import { ArtistProfilePage } from '../pages/artist-profile/artist-profile';

import { MessagePage } from '../pages/message/message';
import { SeeMessagesPage } from '../pages/see-messages/see-messages';
import { GalleryPage } from '../pages/gallery/gallery';





@Component({
 templateUrl: 'app.html'
})
export class MyApp {
 @ViewChild(Nav) nav: Nav;

 activePage: any;

name;
picture;
 public rootPage: any;


 pages: Array<{title: string, component: any, icon?: string}>;

 constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private firebaseService:FirebaseProvider) {
   this.initializeApp();
   this.picture = '../../assets/imgs/pic.jpg';
   // used for an example of ngFor and navigation
if('Log-Out')

   this. firebaseService.getUserSatate().then( data =>{
    this.pages = [
      { title: 'Home', component: ArtisthomePage, icon:"md-home"},
      { title: 'Profile', component: ProfilePage, icon: "md-person"},
      { title: 'Messages', component: SeeMessagesPage, icon: "md-mail" },
      { title: 'Log-Out', component: LogoutPage, icon: "md-log-out"}
    ];
     if (data == 1){
       this.firebaseService.getuserType().then(() =>{
         this.name = this.firebaseService.getusername();
         setTimeout (() =>{
          this.picture = this.firebaseService.returnPictureUrl();
          if (this.picture  == undefined  || this.picture == ""){
            this.picture = '../../assets/imgs/pic.jpg';
          }
            console.log(this.picture)
        }, 3000)
        this.rootPage = ArtisthomePage;
       })

     }
     else{
      this.rootPage = LoginPage ;
     }
   })
 }

 initializeApp() {
   this.platform.ready().then(() => {
     // Okay, so the platform is ready and our plugins are available.
     // Here you can do any higher level native things you might need.
     this.statusBar.styleDefault();
     this.splashScreen.hide();
   });
 }

 openPage(page) {
   // Reset the content nav to have just this page
   // we wouldn't want the back button to show in this scenario
   this.nav.setRoot(page.component);
 }

}