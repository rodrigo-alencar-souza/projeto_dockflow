import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import {MatMenuModule} from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-card',
  standalone: true, // ← Isso precisa estar aqui
  imports: [MatCardModule, MatListModule, MatChipsModule, MatMenuModule, MatIcon, MatIconModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() data: any;
}