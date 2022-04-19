import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  username:string = '';
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.userChange$.subscribe((val:string) => {
      this.username = val;
    });
  }

}
