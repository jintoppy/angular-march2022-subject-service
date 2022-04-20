import { Component } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'subject-service-communciation';
  isLoggedIn= false;
  showUserList = false;

  constructor(private userService: UserService){
    console.log('inside app component constructor');
  }

  showList(){
    this.showUserList = true;
  }

  ngOnInit(){    
    console.log('inside app component ngOnInit');
    this.userService.userChange$.subscribe((val:string | null) => {
      if(val){
        this.isLoggedIn = true;
      }
      else {
        this.isLoggedIn = false;
      }
      
    });
  }

}
