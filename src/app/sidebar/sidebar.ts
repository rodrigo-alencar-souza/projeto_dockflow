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

  // Novo array para menus visíveis
  menuItens: { label: string; route: string; setor: string }[] = [];

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    const isAdmin = this.authService.isAdmin();
    const setorUsuario = this.authService.getSetor();

    const todosMenus = [
      { label: 'Geral', route: '/geral', setor: 'geral' },
      { label: 'Engenharia', route: '/engenharia', setor: 'engenharia' },
      { label: 'Produção', route: '/producao', setor: 'producao' },
      { label: 'Fiscal', route: '/fiscal', setor: 'fiscal' }
    ];

    this.menuItens = todosMenus.filter(menu =>
      isAdmin || menu.setor === setorUsuario || menu.setor === 'geral'
    );
  }

  toggleSidebar(): void {
    this.sidebarAberta = !this.sidebarAberta;
  }
}
