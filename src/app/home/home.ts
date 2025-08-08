import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule,Sidebar],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
