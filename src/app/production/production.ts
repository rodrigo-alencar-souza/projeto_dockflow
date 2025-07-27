import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { CardComponent } from '../card/card.component';


@Component({
  selector: 'app-production',
  standalone: true,
  imports: [Sidebar, CardComponent],
  templateUrl: './production.html',
  styleUrl: './production.scss'
})


export class Production {}
