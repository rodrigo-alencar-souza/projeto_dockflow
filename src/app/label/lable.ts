import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lable',
  imports: [CommonModule],
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
