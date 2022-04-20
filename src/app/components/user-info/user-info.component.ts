import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  username:string | null = '';
  constructor(private userService: UserService) {
    console.log('inside userInfo component constructor');
    
   }

  ngOnInit(): void {    
    console.log('inside userInfo component ngOnInit');
    this.userService.userChange$.subscribe((val:string | null) => {
      this.username = val;
    });
  }

}
