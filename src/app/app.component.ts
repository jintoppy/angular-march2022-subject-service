import { Component } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { FormControl } from '@angular/forms';
import { merge, zip, combineLatest } from 'rxjs';
import { filter, distinctUntilChanged, debounceTime, switchMap, map, tap } from 'rxjs/operators';
import { User } from './models/user';
import { Repo } from './models/repo';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'subject-service-communciation';
  isLoggedIn= false;
  showUserList = false;

  searchCtrl = new FormControl()
  repoSearchCtrl = new FormControl()

  constructor(private userService: UserService){
    console.log('inside app component constructor');
  }

  showList(){
    this.showUserList = true;
  }
  isReset = false;
  previousValue = '';  

  ngOnInit(){    
    console.log('inside app component ngOnInit');
    combineLatest(this.searchCtrl.valueChanges, this.repoSearchCtrl.valueChanges)
      .pipe(
        debounceTime(200),
        filter(([val, val1]:string[]) => val.length > 3 && val1.length > 3),
        distinctUntilChanged(),
        switchMap(([userQuery, repoQuery]:string[] ) => {
          return zip(
              this.userService.searchUsers(userQuery), 
              this.userService.searchRepos(repoQuery)
            );
        })
      )
      .subscribe(([users, repos]: [User[], Repo[]]) => {
        console.log(users);
        console.log(repos);
      })
      

    // merge(this.searchCtrl.valueChanges, this.repoSearchCtrl.valueChanges)
    //   .pipe(
    //     debounceTime(200),
    //     filter((val:string) => val.length > 3),
    //     distinctUntilChanged(),
    //     switchMap((val:string) => this.userService.searchUsers(val)),
    //     map((users: User[]) => users.slice(0, 3))
    //   )
    //   .subscribe((users: User[]) => {
    //       console.log(users);
    //   });

    // this.searchCtrl.valueChanges
    // .pipe(
    //   debounceTime(200),
    //   filter((val:string) => val.length > 3),
    //   distinctUntilChanged()      
    // )
    // .subscribe((val:string) => {
    //   this.userService.searchUsers(val)
    //     .pipe(
    //       map((users: User[]) => users.slice(0, 3))
    //     )
    //     .subscribe((users: User[]) => {
    //           console.log(users);
    //       });      
    // });

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
