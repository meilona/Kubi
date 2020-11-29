import { Injectable } from '@angular/core';
import { AngularFireDatabase , AngularFireList } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import { User } from '../models/user.model';
import * as firebase from 'firebase/app';
// import {firebase} from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dbPath = 'users';
  userRef: AngularFirestoreCollection<User>; 
  private storageRef : any;

  // upload photo
  // uploadTask: AngularFireUploadTask;

  constructor(
    private db: AngularFirestore,
    private fireStorage : AngularFireStorage,
  ) 
  {
    this.storageRef = this.fireStorage.ref('Users');
   }

  // get user berdasarkan skor dan liga 
  getAll(): AngularFirestoreCollection<User>{
    this.userRef = this.db.collection<User>(this.dbPath, ref => ref.orderBy('totalskor', 'desc').limit(10));
    console.log(this.userRef);
    return this.userRef;
  }

  //get user berdasarkan id untuk profile
  getUser(idu: string): AngularFirestoreCollection<User>{
    this.userRef = this.db.collection<User>(this.dbPath, ref => ref.where("id", '==', idu));
    console.log(this.userRef);
    return this.userRef;
  }

  updateProfile(idu: string, value: any){
    this.db.doc(this.dbPath + '/' + idu).update({name: value.name});
    this.db.doc(this.dbPath + '/' + idu).update({email: value.email});
  }

  updateScore(idu: string, score: any){
    this.db.doc(this.dbPath + '/' + idu).update({totalskor: score});
  }


  // getPhotoprofile(id: string){
  //   // console.log("linknya",this.storageRef.child(id).child('JOTI.png').getDownloadURL());
  //   console.log("linknya",this.storageRef.child('JOTI.jpg').getDownloadURL());
  //   console.log("semua", this.storageRef.child(id));
  //   return this.storageRef.child(id+'/JOTI.jpg').getDownloadURL();
  //   // try{
  //   //   return this.storageRef.child(id+'/JOTI.jpg').getDownloadURL();
  //   // }catch(error){
  //   //   console.log("error", error);
  //   // }
  // }

  uploadPhotoprofile(id, foto){
    let ref = this.fireStorage.ref('Users/'+id+'/'+"profile");
      // this.storageRef.child(id).put(foto[0])
    ref.put(foto).then(res=>{
      ref.getDownloadURL().subscribe(url=>{
        console.log(url);
        this.db.doc(this.dbPath+ '/' + id).update({storageRef:url});
      });

    }).catch(e=>{
      console.log(e);
    });
  }
}
