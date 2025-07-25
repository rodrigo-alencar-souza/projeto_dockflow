import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Processo } from '../models/processo.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-processo-detail',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule],
  templateUrl: './detail.process.html',
  styleUrls: ['./detail.process.scss']
})

export class ProcessoDetailComponent {
  constructor(
    private dialogRef: MatDialogRef<ProcessoDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public processo: Processo
  ) {}

  fechar(): void {
    this.dialogRef.close();
  }
}
