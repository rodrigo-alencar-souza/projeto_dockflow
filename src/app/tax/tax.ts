import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-tax',
  imports: [Sidebar, CardComponent],
  templateUrl: './tax.html',
  styleUrl: './tax.scss'
})
export class Tax {

}
