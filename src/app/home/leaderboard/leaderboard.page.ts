import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { take, map } from 'rxjs/operators';
import { User } from '../../../app/models/user.model';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {
  user: any;

  constructor(
    private userSrv: UserService,

  ) { }

  ngOnInit() {
    // untuk dapetin kejuaraan
    this.userSrv.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({data: c.payload.doc.data()}))
        )
    ).subscribe(data => {
      console.log(data);
      this.user = data;
      console.log(this.user[0].data.name);
      console.log(this.user[0].data.storageRef);
    });
  }
}
