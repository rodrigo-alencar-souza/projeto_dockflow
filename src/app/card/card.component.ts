import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import {MatMenuModule} from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, MatListModule, MatChipsModule, MatMenuModule, MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

}
