import { Injectable } from '@angular/core';
import { AngularFireDatabase , AngularFireList } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import { User } from '../models/user.model';
// import {firebase} from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dbPath = 'users';
  userRef: AngularFirestoreCollection<User>; 
  private storageRef : any;

  constructor(
    private db: AngularFirestore,
    private fireStorage : AngularFireStorage,
  ) 
  {
    this.storageRef = this.fireStorage.ref('/Users/');
   }

  getAll(): AngularFirestoreCollection<User>{
    this.userRef = this.db.collection<User>(this.dbPath, ref => ref.orderBy('totalskor', 'desc').limit(10));
    console.log(this.userRef);
    return this.userRef;
  }

  getUser(idu: string): AngularFirestoreCollection<User>{
    this.userRef = this.db.collection<User>(this.dbPath, ref => ref.where("id", '==', idu));
    console.log(this.userRef);
    return this.userRef;
  }
  updateProfile(idu:string, value:any){
    this.db.doc(this.dbPath+ '/' + idu).update({name:value.name});
    this.db.doc(this.dbPath+ '/' + idu).update({email:value.email});
  }
  // getPhotoprofile(id: string){
  //   console.log("linknya",this.storageRef.child(id).child('JOTI.png').getDownloadURL());
  //   return this.storageRef.child(id).child('JOTI.png').getDownloadURL();
  // }
  // uploadPhotoprofile(id, foto){
  //   if(foto && foto.length){

  //   }
  // }
}
