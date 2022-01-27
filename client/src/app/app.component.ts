import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './Models/User';
import { AccountService } from './Services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Dating App';
  Users: any;

  constructor(private accountservice:AccountService)
  {

  }
  ngOnInit(): void {
    this.setcurrentuser();
  }

  setcurrentuser()
  {

    const user:User=JSON.parse(localStorage.getItem('user'));
    this.accountservice.setcurrentuser(user);
  }





  
}
