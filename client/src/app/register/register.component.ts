import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../Services/account.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 // @Input() usersfromHomecomp: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};


  constructor(private accountservice:AccountService) { }

  ngOnInit(): void {
  }

  register() {

    this.accountservice.register(this.model).subscribe(response=>console.log(response));
    this.cancel();

  }
  cancel() {
    this.cancelRegister.emit(false);
    console.log("called cacelled");
  }


}
