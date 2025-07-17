import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-general',
  imports: [RouterModule, Sidebar],
  templateUrl: './general.html',
  styleUrl: './general.scss'
})
export class General {

}
