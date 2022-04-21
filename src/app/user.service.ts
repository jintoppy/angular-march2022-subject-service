import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SearchResult, RepoSearchResult } from './models/search';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //Subject
  //BehaviorSubject
  //ReplaySubject
  public userChange$: ReplaySubject<string | null> = new ReplaySubject<string | null>(3);
  public userResponse$: AsyncSubject<string> = new AsyncSubject<string>();
  constructor(private http: HttpClient) {
    console.log('inside user service constructor');
    const storedUser = localStorage.getItem('username');
    this.userChange$.next(storedUser);
   }


  setUserDetails(username:string){
    localStorage.setItem('username', username);
    this.userChange$.next(username);
  }

  searchUsers(q: string){
    const url = `https://api.github.com/search/users?q=${q}`;
    return this.http.get<SearchResult>(url)
      .pipe(
        map((result: SearchResult) => result.items)
      )
  }

  searchRepos(q:string){
    const url = `https://api.github.com/search/repositories?q=${q}`;
    return this.http.get<RepoSearchResult>(url)
      .pipe(
        map((result: RepoSearchResult) => result.items)
      )
  }
}
