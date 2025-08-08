import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule, MatCheckboxChange } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Sidebar } from '../sidebar/sidebar';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation';
import { ApiUserService } from '../service/api.user.service';
import { ApiProcessService } from '../service/api.process.service';

interface User {
  id: number;
  name: string;
  permissions: string[];
}

type ProcessStatus = 'pending' | 'approved' | 'rejected';

interface Process {
  id: string;
  nome: string;
  setor: string;
  cargo: string;
  processo: string;
  descricao: string;
  status: ProcessStatus;
}


@Component({
  selector: 'app-adm',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    Sidebar
  ],
  templateUrl: './adm.html',
  styleUrls: ['./adm.scss']
})
export class Adm implements OnInit {

  allPermissions         = ['geral','engenharia','produção','fiscal'];
  userDisplayedColumns   = ['user', ...this.allPermissions, 'status'];
  approvedUserColumns    = ['user', ...this.allPermissions, 'action'];

  processDisplayedColumns: string[] = [
    'id',
    'nome',
    'setor',
    'cargo',
    'processo',
    'descricao',
    'status',
    'actions'
  ];

  approvedProcessColumns: string[] = [
    'id',
    'nome',
    'setor',
    'cargo',
    'processo',
    'descricao',
    'status',
    'action'
  ];



  userData: User[]           = [];
  approvedUsers: User[]      = [];

  processData: Process[]     = [];
  approvedProcesses: Process[]= [];

  constructor(
    private apiUser: ApiUserService,
    private apiProcess: ApiProcessService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef      // injeção do ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadProcesses();
  }

  // ====== Usuários ======
  private loadUsers(): void {
    this.apiUser.getDados().subscribe({
      next: (users: any[]) => {
        this.userData = users
          .filter(u => u.status === 'pending')
          .map(u => ({ id: u.id, name: u.nome, permissions: u.permissions }));

        this.approvedUsers = users
          .filter(u => u.status === 'approved')
          .map(u => ({ id: u.id, name: u.nome, permissions: u.permissions }));

        this.cdr.detectChanges();   // força nova detecção de mudanças
      },
      error: err => console.error(err)
    });
  }

  togglePermission(user: User, perm: string, e: MatCheckboxChange): void {
    if (e.checked) {
      user.permissions.push(perm);
    } else {
      user.permissions = user.permissions.filter(p => p !== perm);
    }
  }

  approveUser(user: User): void {
    if (!user.permissions.length) {
      this.snackBar.open(`Selecione ao menos uma permissão para ${user.name}`, 'Fechar', { duration: 3000 });
      return;
    }

    this.apiUser.putDados(user.id, {
      status: 'approved',
      permissions: user.permissions
    }).subscribe({
      next: () => {
        this.userData = this.userData.filter(u => u.id !== user.id);
        this.approvedUsers.push(user);
        this.snackBar.open(`${user.name} aprovado!`, 'Fechar', { duration: 3000 });
        this.cdr.detectChanges();
      },
      error: err => console.error(err)
    });
  }

  rejectUser(user: User): void {
    this.apiUser.deleteDados(user.id).subscribe({
      next: () => {
        this.userData = this.userData.filter(u => u.id !== user.id);
        this.snackBar.open(`${user.name} rejeitado.`, 'Fechar', { duration: 3000 });
        this.cdr.detectChanges();
      },
      error: err => console.error(err)
    });
  }

  confirmDelete(user: User): void {
    const ref = this.dialog.open(DeleteConfirmationComponent, {
      width: '350px',
      data: { name: user.name }
    });
    ref.afterClosed().subscribe(ok => {
      if (!ok) return;
      this.apiUser.deleteDados(user.id).subscribe({
        next: () => {
          this.approvedUsers = this.approvedUsers.filter(u => u.id !== user.id);
          this.snackBar.open(`${user.name} removido.`, 'Fechar', { duration: 3000 });
          this.cdr.detectChanges();
        },
        error: err => console.error(err)
      });
    });
  }

  // ====== Processos ======
 private loadProcesses(): void {
    this.apiProcess.getDados().subscribe({
      next: (procs: any[]) => {
        // mapear resposta da API para nossa interface Process
        this.processData = procs
          .filter(p => p.status === 'pending')
          .map(p => ({
            id: String(p.id),
            nome: p.nome,
            setor: p.setor,
            cargo: p.cargo,
            processo: p.processo,
            descricao: p.descricao,
            status: p.status as ProcessStatus
          }));

        this.approvedProcesses = procs
          .filter(p => p.status === 'approved')
          .map(p => ({
            id: String(p.id),
            nome: p.nome,
            setor: p.setor,
            cargo: p.cargo,
            processo: p.processo,
            descricao: p.descricao,
            status: p.status as ProcessStatus
          }));

        this.cdr.detectChanges();
      },
      error: err => console.error(err)
    });
  }

  approveProcess(proc: Process): void {
    this.apiProcess.putDados(+proc.id, { status: 'approved' }).subscribe({
      next: () => {
        // mover para aprovados
        this.processData = this.processData.filter(p => p.id !== proc.id);
        proc.status = 'approved';
        this.approvedProcesses.push(proc);

        this.snackBar.open(`✅ ${proc.processo} aprovado!`, 'Fechar', { duration: 3000 });
        this.cdr.detectChanges();
      },
      error: err => console.error(err)
    });
  }

  rejectProcess(proc: Process): void {
    this.apiProcess.deleteDados(+proc.id).subscribe({
      next: () => {
        this.processData = this.processData.filter(p => p.id !== proc.id);
        this.snackBar.open(`❌ ${proc.processo} rejeitado.`, 'Fechar', { duration: 3000 });
        this.cdr.detectChanges();
      },
      error: err => console.error(err)
    });
  }

  confirmDeleteProcess(proc: Process): void {
    const ref = this.dialog.open(DeleteConfirmationComponent, {
      width: '350px',
      data: { name: proc.processo }
    });
    ref.afterClosed().subscribe(ok => {
      if (!ok) return;
      this.apiProcess.deleteDados(+proc.id).subscribe({
        next: () => {
          this.approvedProcesses = this.approvedProcesses.filter(p => p.id !== proc.id);
          this.snackBar.open(`🗑️ ${proc.processo} removido.`, 'Fechar', { duration: 3000 });
          this.cdr.detectChanges();
        },
        error: err => console.error(err)
      });
    });
  }
}
