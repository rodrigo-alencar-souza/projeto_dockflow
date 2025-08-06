import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@Component({
  selector: 'app-confirm-save',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatSnackBarModule],
  template: `
    <h2 mat-dialog-title>Confirmar Salvamento</h2>
    <mat-dialog-content>Você deseja salvar as alterações feitas neste processo?</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close(false)">Cancelar</button>
      <button mat-button color="primary" (click)="dialogRef.close(true)">Salvar</button>
    </mat-dialog-actions>
  `
})
export class ConfirmSaveComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmSaveComponent>) {}
}
