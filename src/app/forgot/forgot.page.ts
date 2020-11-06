import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AlertController, LoadingController, NavController, ToastController} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  forgotForm: FormGroup;

  email = '';
  password = '';
  error = '';

  validationMessages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ]
  };

  constructor(
      private fireauth: AngularFireAuth,
      private router: Router,
      private toastController: ToastController,
      public loadingController: LoadingController,
      private navCtrl: NavController,
      private formBuilder: FormBuilder,
      public alertController: AlertController) {
  }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  tryForgot(value) {
    this.email = value.email;
    this.fireauth.sendPasswordResetEmail(this.email)
        .then(data => {
          console.log(data);
          this.presentToast('Password reset email sent', 'bottom', 1000);
          this.router.navigateByUrl('/login');
        })
        .catch(err => {
          console.log(` failed ${err}`);
          this.error = err.message;
        });
  }

  async openLoader() {
    const loading = await this.loadingController.create({
      message: 'Please Wait ...',
      duration: 2000
    });
    await loading.present();
  }
  async closeLoading() {
    return await this.loadingController.dismiss();
  }

  async presentToast(message, position, duration) {
    const toast = await this.toastController.create({
      message,
      position,
      duration
    });
    toast.present();
  }

}
