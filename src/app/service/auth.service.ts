import { Injectable } from '@angular/core';

// auth.service.ts
export enum PerfilUsuario {
  ADM = 'admin',       // aqui trocamos 'adm' por 'admin'
  NORMAL = 'normal'
}


export interface UsuarioMock {
  username: string;
  password: string;
  setor: string;
  perfil: PerfilUsuario;
}

const MOCK_USERS: UsuarioMock[] = [
  { username: 'fiscal', password: '123', setor: 'fiscal', perfil: PerfilUsuario.NORMAL },
  { username: 'producao', password: '123', setor: 'producao', perfil: PerfilUsuario.NORMAL },
  { username: 'engenharia', password: '123', setor: 'engenharia', perfil: PerfilUsuario.NORMAL },
  { username: 'adm', password: '123', setor: 'administracao', perfil: PerfilUsuario.ADM }
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usuarioLogado: UsuarioMock | null = null;

    login(username: string, password: string): boolean {
      const usuario = MOCK_USERS.find(
        user => user.username === username && user.password === password
      );
      if (usuario) {
        this.usuarioLogado = usuario;
        return true;
      }
      return false;
    }
    
  getUser(): UsuarioMock | null {
    return this.usuarioLogado;
  }

  getUserRole(): string {
    return this.usuarioLogado?.perfil ?? PerfilUsuario.NORMAL;
  }

  isAdmin(): boolean {
    return this.usuarioLogado?.perfil === PerfilUsuario.ADM;
  }

  getSetor(): string {
    return this.usuarioLogado?.setor ?? 'geral';
  }

  getSetorRoute(): string {
    const setor = this.getSetor();
    switch (setor) {
      case 'fiscal': return 'fiscal';
      case 'producao': return 'producao';
      case 'engenharia': return 'engenharia';
      case 'administracao': return 'painel-adm';
      default: return 'home';
    }
  }

  canAccessSetor(setor: string): boolean {
    return this.isAdmin() || this.getSetor() === setor || setor === 'geral';
  }

  isAuthenticated(): boolean {
    return !!this.usuarioLogado;
  }

  logout(): void {
    this.usuarioLogado = null;
  }
}
