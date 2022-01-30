import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators'
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  //local vs kubernates
  //baseurl = 'http://127.0.0.1:5001/api/'
  baseurl = 'https://localhost:5001/api/'

  private CurrentUserSource = new ReplaySubject<User>(1)
  currentUser$ = this.CurrentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseurl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.CurrentUserSource.next(user);
        }
      })

    );
  }

  logout() {
    localStorage.removeItem('user');
    this.CurrentUserSource.next(null);
  }

  setcurrentuser(user: User) {
    this.CurrentUserSource.next(user);
  }

  register(model: any) {
    return this.http.post(this.baseurl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.CurrentUserSource.next(user);
        }
        return user;
      }
      )
    )
  }
}
