import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar implements OnInit {
  sidebarAberta = false;
  setores: string[] = [];

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    const isAdmin = this.authService.isAdmin();
    const setor = this.authService.getSetor();

    this.setores = isAdmin
      ? ['engenharia', 'producao', 'geral', 'fiscal']
      : [setor, 'geral'];

  }

  toggleSidebar(): void {
    this.sidebarAberta = !this.sidebarAberta;
  }
}
