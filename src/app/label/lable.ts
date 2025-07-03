import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lable',
  imports: [],
  templateUrl: './lable.html',
  styleUrl: './lable.scss'
})
export class Lable {

  constructor(private router: Router){}

  isDropdownVisible = false;

  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  Login_navigate(): void {
    this.router.navigate(['login']);
  }


}
