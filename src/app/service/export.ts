import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  async exportarMarkdown(data: any): Promise<void> {
    const mdContent = data.blocks
      .map((block: { data: { text: string | string[] } }) => {
        return typeof block.data.text === 'string' ? block.data.text : block.data.text.join(' ');
      })
      .join('\n\n');

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'processo.md';
    link.click();
  }

  async exportarPDF(data: any): Promise<void> {
    const doc = new jsPDF('p', 'mm', 'a4');
    const margin = 20;
    const maxWidth = doc.internal.pageSize.getWidth() - margin * 2;
    const lineHeight = 10;
    let currentHeight = margin;

    data.blocks.forEach((block: { data: { text: string | string[] } }) => {
      const text = typeof block.data.text === 'string' ? block.data.text : block.data.text.join(' ');
      const lines = doc.splitTextToSize(text, maxWidth);

      lines.forEach((line: string, i: number) => {
        if (currentHeight + lineHeight > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          currentHeight = margin;
        }

        const align = i === lines.length - 1 ? 'left' : 'justify';
        doc.text(line, margin, currentHeight, { align, maxWidth });
        currentHeight += lineHeight;
      });
    });

    doc.save('processo.pdf');
  }
}
