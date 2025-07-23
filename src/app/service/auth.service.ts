import { Injectable } from '@angular/core';

interface UsuarioMock {
  username: string;
  password: string;
  setor: string;
}

const MOCK_USERS: UsuarioMock[] = [
  { username: 'fiscal', password: '123', setor: 'fiscal' },
  { username: 'producao', password: '123', setor: 'producao' },
  { username: 'engenharia', password: '123', setor: 'engenharia' },
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private setorAtual: string | null = null;

  login(username: string, password: string): boolean {
    const usuario = MOCK_USERS.find(
      user => user.username === username && user.password === password
    );
    if (usuario) {
      this.setorAtual = usuario.setor;
      return true;
    }
    return false;
  }

  getSetor(): string | null {
    return this.setorAtual;
  }

  isAuthenticated(): boolean {
    return !!this.setorAtual;
  }

  logout(): void {
    this.setorAtual = null;
  }
}
