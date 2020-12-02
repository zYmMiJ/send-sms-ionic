import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInput, NavController} from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { createTextMaskInputElement } from 'text-mask-core';
import { Sim } from '@ionic-native/sim/ngx';
import {SMS} from '@ionic-native/sms/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public simInfo: any;
  public cards: any;
  constructor(private androidPermissions: AndroidPermissions, public navCtrl: NavController, private sim: Sim, private sms: SMS) {}

  async getSimData() {
    try {
      const simPermission = await this.sim.requestReadPermission();
      if (simPermission === 'OK') {
        const simData = await this.sim.getSimInfo();
        this.simInfo = simData;
        this.cards = simData.cards;
        console.log(simData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  permission() {
    console.log('1');
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS);
  }

  permissionCamera() {
    console.log('2');
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA);
  }
  async sendSMS() {
    try {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
          result => {
            console.log('Has permission?', result.hasPermission);
            console.log('Success');
            this.sms.send('791172', 'Hello world!');
          },
          err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS)
      );

    } catch (error) {
      console.log('erroe');
    }
  }
}
