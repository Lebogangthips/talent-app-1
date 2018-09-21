import { Component } from '@angular/core';
import { NavController, ViewController, AlertController, ModalController,NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import {LoginPage} from '../login/login';

import { UploadPreviewPage } from '../upload-preview/upload-preview';


import { ArtisthomePage } from '../artisthome/artisthome';


// import { SecondPage } from '../second/second';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  url;
  category;
  vidName;
  vidDesc;
  videos = [];
  videos2 =  this.navParams.get('vid');
 

  constructor(public navCtrl: NavController,private firebaseService:FirebaseProvider,public alertCtrl:AlertController, public modalCtrl: ModalController, public navParams: NavParams) {
 
  }

    insertvid(event:any){

      if (event.target.files && event.target.files[0]){
        let reader = new FileReader();
    
        reader.onload = (event:any) =>{
          this.url = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);

      }
    }
    upload(){
      this.firebaseService.uploadvid(this.url).then(data =>{
        console.log(data);
         this.firebaseService.storeToDB(data, this.category, this.vidName, this.vidDesc).then(() =>{
           console.log('added to db');
           this.navCtrl.push(HomePage);
         },
        Error =>{
          console.log(Error)
        })
      }, Error =>{
        console.log(Error )
      })
    }

    preview(){

      const modal = this.modalCtrl.create(UploadPreviewPage);
      modal.present();
      this.videos.push(this.videos2);
    }
    test(indexNUmber){
      this.navCtrl.push(HomePage, {vid:this.videos[indexNUmber]})
    }
  }




