import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



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
  imports: [CommonModule,
    // BrowserAnimationsModule, // Essencial para animações do Material
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
],
  templateUrl: './adm.html',
  styleUrl: './adm.scss'
})
export class Adm {

  



  userData: User[] = [
    { name: 'Carlos Lima', general: true, engineering: false, production: true },
    { name: 'Marina Souza', general: false, engineering: true, production: false },
    { name: 'Felipe Rocha', general: true, engineering: true, production: true }
  ];

  processData: Process[] = [
    { name: 'Processo A' },
    { name: 'Processo B' },
    { name: 'Processo C' }
  ];

  userDisplayedColumns: string[] = ['user', 'general', 'engineering', 'production', 'status'];
  processDisplayedColumns: string[] = ['process', 'status'];

  approveUser(user: User): void {
    console.log(`Usuário aprovado: ${user.name}`);
    // Aqui você pode integrar com sua API ou alterar o estado local
  }

  rejectUser(user: User): void {
    console.log(`Usuário rejeitado: ${user.name}`);
    // Idem
  }

  approveProcess(process: Process): void {
    console.log(`Processo aprovado: ${process.name}`);
  }

  rejectProcess(process: Process): void {
    console.log(`Processo rejeitado: ${process.name}`);
  }
}


