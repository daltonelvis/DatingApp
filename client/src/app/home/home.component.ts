import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;
  users: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  registerToggle() {
    // This is for @input demonstration
    // this.getusers();
    this.registerMode = !this.registerMode;
  }

  // This is for @input demonstration
  // getusers() {
  //   this.http.get('https://localhost:5001/api/users/').subscribe(res => {
  //     this.users = res;
  //   }, error => {
  //     console.log(error);
  //   })
  // } 

  cancelfromregister(event: boolean) {
    this.registerMode = event;
  }

}
