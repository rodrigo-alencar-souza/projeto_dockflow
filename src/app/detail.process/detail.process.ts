// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
// import { CommonModule } from '@angular/common';
// import { Processo } from '../models/processo.model';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// @Component({
//   selector: 'app-processo-detail-page',
//   standalone: true,
//   imports: [CommonModule, MatDialogModule],
//   templateUrl: './detail.process.html',
//   styleUrls: ['./detail.process.scss']
// })
// export class ProcessoDetailComponent {
//   constructor(
//     private dialogRef: MatDialogRef<ProcessoDetailComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: Processo
//   ) {}

//   fechar(): void {
//     this.dialogRef.close();
//   }

//   exportarPDF(): void {
//     const element = document.getElementById('a4-content');
//     if (!element) return;

//     html2canvas(element, { scale: 2 }).then(canvas => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//       pdf.save(`${this.data.processo}.pdf`);
//     });
//   }
// }

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Processo } from '../models/processo.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-processo-detail',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule],
  templateUrl: './detail.process.html',
  styleUrls: ['./detail.process.scss']
})
export class ProcessoDetailComponent {
  processo: Processo;

  constructor(
    private dialogRef: MatDialogRef<ProcessoDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Processo
  ) {
    this.processo = data;
  }

  fechar(): void {
    this.dialogRef.close();
  }
}
