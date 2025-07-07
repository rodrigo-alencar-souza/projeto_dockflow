import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  constructor(private router: Router){}

  Back_button_navigate(): void {
      this.router.navigate(['home']);
    }
  
  Register_navigate(): void {
      this.router.navigate(['cadastro-usuario']);
    }  
}
