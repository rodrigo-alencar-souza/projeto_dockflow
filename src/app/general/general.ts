import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [Sidebar, CardComponent],
  templateUrl: './general.html',
  styleUrls: ['./general.scss']
})
export class General {}
