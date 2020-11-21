import { Injectable } from '@angular/core';
import { AngularFireDatabase , AngularFireList } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dbPath = 'users';
  userRef: AngularFirestoreCollection<User>; 

  constructor(
    private db: AngularFirestore,
  ) 
  { }

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
    this.userRef = this.db.collection<User>(this.dbPath, ref => ref.where("id", '==', idu));
    this.userRef.snapshotChanges().subscribe((res: any) => {
      let id = res[0].payload.doc.id;
      console.log("nama :",value.name);
      console.log("email", value.email);
      this.db.collection('options').doc(id).update({name:value.name});
      this.db.collection('options').doc(id).update({email:value.email});
    });
    console.log(this.userRef);
  }
}
