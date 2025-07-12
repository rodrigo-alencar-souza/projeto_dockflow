import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CardComponent } from '../card/card.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-home',
  imports: [ MatCardModule, MatListModule, MatChipsModule, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router){}

  isDropdownVisible = false;

  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  Login_navigate(): void {
    this.router.navigate(['login']);
  }

}
