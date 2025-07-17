import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-engineering',
  imports: [RouterModule, Sidebar],
  templateUrl: './engineering.html',
  styleUrl: './engineering.scss'
})
export class Engineering {

}
