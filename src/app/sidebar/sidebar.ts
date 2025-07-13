import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';



@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule, MatSidenavModule, MatButtonModule, MatListModule, MatIconModule, MatToolbarModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {

  sidebarAberta = false;

  toggleSidebar(): void {
    this.sidebarAberta = !this.sidebarAberta;
  }


  }




