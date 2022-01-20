import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Dating App';
  Users: any;

  constructor(private http:HttpClient)
  {

  }
  ngOnInit(): void {
    this.getusers();
  }

  getusers()
  {
    this.http.get('https://localhost:5001/api/users/').subscribe(res=>{
      this.Users=res;
    },error=>{
      console.log(error);
    })
  }

  
}
