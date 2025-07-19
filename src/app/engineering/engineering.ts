import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { CardComponent } from '../card/card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-engineering',
  imports: [RouterModule, Sidebar, CardComponent],
  templateUrl: './engineering.html',
  styleUrl: './engineering.scss'
})
export class Engineering {

  constructor(private router: Router){}

  Process_button_navigate(): void {
        this.router.navigate(['cadastro-processo']);
      }

}
