import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-engineering',
  standalone: true,
  imports: [Sidebar, CardComponent],
  templateUrl: './engineering.html',
  styleUrls: ['./engineering.scss']
})
export class Engineering {}
