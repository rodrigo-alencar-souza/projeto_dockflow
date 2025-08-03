import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  templateUrl: './delete-confirmation.html',
  imports: [
    CommonModule,        // Para estrutura básica de Angular
    MatDialogModule,     // Para usar <mat-dialog-content>, <mat-dialog-actions>, etc.
    MatButtonModule      // Para os botões com mat-button e mat-dialog-close
  ]
})
export class DeleteConfirmationComponent {}