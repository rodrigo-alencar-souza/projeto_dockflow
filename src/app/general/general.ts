import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [RouterModule, Sidebar, CardComponent],
  templateUrl: './general.html',
  styleUrl: './general.scss'
})
export class General {

}
