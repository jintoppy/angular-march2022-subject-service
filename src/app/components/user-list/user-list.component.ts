import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: string[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log('inside ngOnInit of UserList component');
    this.userService.userChange$.subscribe((val:string|null) => {
      if(val){
        this.users = [...this.users, val];
      }
    });
  }

}
