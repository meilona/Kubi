import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { take, map } from 'rxjs/operators';
import {NgForm} from '@angular/forms';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Platform} from '@ionic/angular';
// import {Camera, CameraResultType, CameraSource, Capacitor} from '@capacitor/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource,FilesystemEncoding } from '@capacitor/core';
const { Camera, Filesystem, Storage } = Plugins;

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})

export class EditprofilePage implements OnInit {
  // selectedFile: File;
  key: string;
  User :any;
  name: string; email: string; birthDate: string; totalskor: number;liga: string; 
  selectedFile: any;
  imageUrl: any;
  object :any;
  //buat gambar
  // img1 : any; 

  @ViewChild('f',null) f:NgForm;
  @ViewChild('filePicker',{static:false}) filePickerRef: ElementRef<HTMLInputElement>;
  isDesktop: boolean;
  img1: SafeResourceUrl;
  private fileName: any;
  constructor(private router: Router,
    private userSrv: UserService,
    private platform: Platform,
    private sanitizer: DomSanitizer,) {
    this.key = this.router.getCurrentNavigation().extras.state.key; // should log out 'bar'
  }
  
  ngOnInit() {
    if((this.platform.is('mobile')&& this.platform.is('hybrid'))||this.platform.is('desktop')){
      this.isDesktop = true;
    }
  }
  ionViewWillEnter(){
    console.log("ini key", this.key);
    this.userSrv.getUser(this.key).snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({data: c.payload.doc.data()}))
        )
    ).subscribe(data => {
      console.log(data);
      this.User = data;
      console.log(this.User[0].data.name);
      this.name = this.User[0].data.name;
      this.email = this.User[0].data.email;
      this.birthDate = this.User[0].data.birthDate;
      this.totalskor = this.User[0].data.totalskor;
      this.liga = this.User[0].data.liga;
      if(this.User[0].data.storageRef != null){
        this.imageUrl = this.User[0].data.storageRef;
      }
      else{
        this.imageUrl = 'assets/image/avatar_profile.png';
      }
    });
  }

  onSubmit(form : NgForm){
    console.log('onSubmit');
    console.log(form);
    if(form.invalid){
      return;
    }
    console.log(form.value);
    this.userSrv.updateProfile(this.key, form.value);
  }
  chooseFile (event) {
    this.selectedFile = event.target.files
  }
  onFinish(){
    this.router.navigate(['/home/profile/',this.key]);
  }

  async getPicture(type:string){
    if(!Capacitor.isPluginAvailable('Camera') || (this.isDesktop && type === 'gallery')){
      this.filePickerRef.nativeElement.click();
      return;
    }
    
    const image = await Camera.getPhoto({
      quality: 100,
      width: 400,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt
    });
    let reader = new FileReader();

    this.object = image.webPath;
    // this.object.src = this.object;
    console.log("object", this.object);
    let blob = await fetch(image.webPath).then(r=>r.blob());
    console.log("blob", blob);
    this.img1 = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.webPath));
    console.log(this.img1);

    this.fileName = blob;
    console.log("fileName", this.fileName);
  }

  onFileChoose(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    const pattern = /image-*/;
    const reader = new FileReader();

    if(!file.type.match(pattern)){
      console.log('File format not supported');
      return;
    }

    reader.onload = ()=>{
      this.img1 = reader.result.toString();
    };
    reader.readAsDataURL(file);
  }




  // onFileChanged(event) {
  //   this.selectedFile = event.target.files[0];
  //   this.fileName = this.selectedFile;
  //   console.log("file name:",this.fileName);
  // }

  onUpload() {
    console.log(this.fileName + ' is uploaded!');
    this.userSrv.uploadPhotoprofile(this.key, this.fileName);
    // this.imageUrl = this.userSrv.getPhotoprofile(this.key);
    // upload code goes here
  }

  // untuk trigger foto baru di tampilin di html
  // onFileChange(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     let reader = new FileReader();
  //     reader.onload = (event:any) => {
  //       this.img1 = event.target.result;
  //     }
  //     reader.readAsDataURL(event.target.files[0]);  // to trigger onload
  //     this.selectedFile = event.target.files[0];
  //     this.fileName = this.selectedFile;
  //     console.log("select url",this.fileName);
  //   }
    
  //   let fileList: FileList = event.target.files;  
  //   let file: File = fileList[0];
  //   console.log(file);
  // }
}
