import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //Subject
  //BehaviorSubject
  //ReplaySubject
  public userChange$: ReplaySubject<string | null> = new ReplaySubject<string | null>(3);
  public userResponse$: AsyncSubject<string> = new AsyncSubject<string>();
  constructor() {
    console.log('inside user service constructor');
    const storedUser = localStorage.getItem('username');
    this.userChange$.next(storedUser);
   }


  setUserDetails(username:string){
    localStorage.setItem('username', username);
    this.userChange$.next(username);
  }
}
