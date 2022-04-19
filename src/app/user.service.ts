import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userChange$: Subject<string> = new Subject<string>();
  constructor() { }


  setUserDetails(username:string){
    this.userChange$.next(username);
  }
}
