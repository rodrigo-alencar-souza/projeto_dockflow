import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']); // 🔐 redireciona se não estiver logado
      return false;
    }

    if (this.authService.isAdmin()) {
      return true; // ✅ admin autenticado: acesso permitido
    }

    this.router.navigate(['/acesso-negado']); // 🚫 logado mas sem permissão
    return false;
  }
}
