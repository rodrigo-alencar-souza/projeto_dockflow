import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation';
import { MatDialogModule } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';


interface Process {
  name: string;
}

interface User {
  name: string;
  general: boolean;
  engineering: boolean;
  production: boolean;
}

@Component({
  selector: 'app-adm',
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    FormsModule,
    MatDialogModule,
    Sidebar
  ],
  standalone: true,
  templateUrl: './adm.html',
  styleUrls: ['./adm.scss']
})
export class Adm {
  constructor(private snackBar: MatSnackBar, private dialog: MatDialog, private cdr: ChangeDetectorRef, ) {}

  userData: User[] = [
    { name: 'Carlos Lima', general: true, engineering: false, production: true },
    { name: 'Marina Souza', general: false, engineering: true, production: false },
    { name: 'Felipe Rocha', general: true, engineering: true, production: true }
  ];

  approvedUsers: User[] = [];
  processData: Process[] = [
    { name: 'Processo A' },
    { name: 'Processo B' },
    { name: 'Processo C' }
  ];

  userDisplayedColumns: string[] = ['user', 'general', 'engineering', 'production', 'status'];
  approvedUserColumns: string[] = ['user', 'general', 'engineering', 'production', 'action'];
  processDisplayedColumns: string[] = ['process', 'status'];

  approveUser(user: User): void {
    if (!user.general && !user.engineering && !user.production) {
      this.snackBar.open(`⚠️ Selecione ao menos uma permissão para ${user.name}`, 'Fechar', { duration: 3000 });
      return;
    }

    this.snackBar.open(`✅ ${user.name} aprovado com permissões`, 'Fechar', { duration: 3000 });
    this.userData = this.userData.filter(u => u !== user);
    this.approvedUsers = [...this.approvedUsers, user];
  }

  rejectUser(user: User): void {
    console.log(`Usuário rejeitado: ${user.name}`);
    this.snackBar.open(`❌ ${user.name} rejeitado.`, 'Fechar', { duration: 3000 });

    this.userData = this.userData.filter(u => u !== user);
  }

  approveProcess(process: Process): void {
    console.log(`Processo aprovado: ${process.name}`);
    this.snackBar.open(`✅ ${process.name} aprovado!`, 'Fechar', { duration: 3000 });

    this.processData = this.processData.filter(p => p !== process);
  }

  rejectProcess(process: Process): void {
    console.log(`Processo rejeitado: ${process.name}`);
    this.snackBar.open(`❌ ${process.name} rejeitado.`, 'Fechar', { duration: 3000 });

    this.processData = this.processData.filter(p => p !== process);
  }

  confirmDelete(user: User): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '350px',
      data: { name: user.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.approvedUsers = this.approvedUsers.filter(u => u !== user);
        this.snackBar.open(`🗑️ ${user.name} foi removido com sucesso`, 'Fechar', { duration: 3000 });
        this.cdr.detectChanges(); // 💥 força o Angular a re-renderizar a view
      }
    });
}

  
}
