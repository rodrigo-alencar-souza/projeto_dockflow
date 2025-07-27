import { Injectable } from '@angular/core';

enum PerfilUsuario {
  ADM = 'adm',
  NORMAL = 'normal'
}

interface UsuarioMock {
  username: string;
  password: string;
  setor: string;
  perfil: PerfilUsuario;
}

const MOCK_USERS: UsuarioMock[] = [
  { username: 'fiscal', password: '123', setor: 'fiscal', perfil: PerfilUsuario.NORMAL },
  { username: 'producao', password: '123', setor: 'producao', perfil: PerfilUsuario.NORMAL },
  { username: 'engenharia', password: '123', setor: 'engenharia', perfil: PerfilUsuario.NORMAL },
  { username: 'administrador', password: '321', setor: 'engenharia', perfil: PerfilUsuario.ADM }, 
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

  isAdmin(): boolean {
    return this.usuarioLogado?.perfil === PerfilUsuario.ADM;
  }

  getSetor(): string | null {
    return this.usuarioLogado?.setor || null;
  }

  isAuthenticated(): boolean {
    return !!this.usuarioLogado;
  }

  logout(): void {
    this.usuarioLogado = null;
  }
}
