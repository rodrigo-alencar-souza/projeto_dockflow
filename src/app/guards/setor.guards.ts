import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

export const setorGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const setorNecessario = route.data['setor'];

  if (!auth.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  // ✅ Nova lógica: ADM acessa tudo
  if (auth.isAdmin() || auth.getSetor() === setorNecessario || setorNecessario === 'geral') {
    return true;
  }

  router.navigate(['/acesso-negado']);
  return false;
};
