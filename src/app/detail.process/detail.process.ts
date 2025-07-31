import { Component, OnInit, AfterViewInit } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import { ProcessoService } from '../service/process.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import CodeTool from '@editorjs/code';
import Table from '@editorjs/table';
import Delimiter from '@editorjs/delimiter';





@Component({
  selector: 'app-visualizacao',
  templateUrl: './detail.process.html',
  styleUrls: ['./detail.process.scss']
})
export class VisualizacaoComponent implements OnInit, AfterViewInit {
  editor!: EditorJS;
  processo: any; // ou defina um tipo mais específico
  

  constructor(private processoService: ProcessoService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.processo = this.processoService.getProcessoSelecionado();
    if (isPlatformBrowser(this.platformId)) {
    // Aqui é seguro usar window
    console.log(window.innerWidth);
  }

  }

 
  async ngAfterViewInit(): Promise<void> {
  if (isPlatformBrowser(this.platformId)) {
    const { default: EditorJS } = await import('@editorjs/editorjs');
    this.editor = new EditorJS({
      holder: 'editorjs',
      tools: { 
        header: Header,
        paragraph: Paragraph, 
        list: List, 
        quote: Quote, 
        code: CodeTool, 
        table: Table, 
        delimiter: Delimiter, 
      },
      data: {
        blocks: [
          {
        type: 'header',
        data: {
          text: this.processo?.processo || 'Sem título disponível.',
          // text: this.processo?.processo || 'Sem título disponível.',
          level: 2
        }
      },
          {
            type: 'paragraph',
            data: { text: this.processo?.setor || 'Sem descrição disponível.' }
          },
          {
            type: 'paragraph',
            data: { text: this.processo?.nome || 'Sem nome disponível.' }
          },
          {
            type: 'paragraph',
            data: { text: this.processo?.cargo || 'Sem cargo disponível.' }
          },
          {
            type: 'paragraph',
            data: { text: this.processo?.descricao || 'Sem descrição disponível.' }
          },
          {
            type: 'paragraph',
            data: { text: this.processo?.passos || 'Sem passo a passo disponível.' }
          }
        ]
      }
    });
  }
}


  async exportarMarkdown(): Promise<void> {
    const markdown = await this.editor.save();
    const mdContent = markdown.blocks.map((block: { data: { text: any; }; }) => block.data.text).join('\n\n');
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'processo.md';
    link.click();
  }

  async exportarPDF(): Promise<void> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF('p', 'mm', 'a4');

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxLineWidth = pageWidth - margin * 2;
  const lineHeight = 10;
  let currentHeight = 20;

  const content = await this.editor.save();

  content.blocks.forEach((block: { data: { text: string | string[] } }) => {
    const rawText = typeof block.data.text === 'string' ? block.data.text : block.data.text.join(' ');
    const lines = doc.splitTextToSize(rawText, maxLineWidth);

    lines.forEach((line: string | string[], i: number) => {
      if (currentHeight + lineHeight > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        currentHeight = margin;
      }

      // Justificar todas as linhas, exceto a última
      const align = i === lines.length - 1 ? 'left' : 'justify';
      doc.text(line, margin, currentHeight, { align, maxWidth: maxLineWidth });
      currentHeight += lineHeight;
    });
  });

  doc.save('processo.pdf');
}


   
//   async exportarPDF(): Promise<void> {
//   const { jsPDF } = await import('jspdf');
//   const doc = new jsPDF('p', 'mm', 'a4'); // formato A4

//   const pageWidth = doc.internal.pageSize.getWidth();
//   const margin = 20; // margem lateral
//   const maxLineWidth = pageWidth - margin * 2;
//   const lineHeight = 10;
//   let currentHeight = 20;

//   const content = await this.editor.save();

//   content.blocks.forEach((block: { data: { text: string | string[] } }) => {
//     const text = typeof block.data.text === 'string' ? block.data.text : block.data.text.join(' ');
//     const lines = doc.splitTextToSize(text, maxLineWidth);

//     lines.forEach((line: string | string[]) => {
//       if (currentHeight + lineHeight > doc.internal.pageSize.getHeight() - margin) {
//         doc.addPage(); // adiciona nova página se passar do limite
//         currentHeight = margin;
//       }

//       doc.text(line, margin, currentHeight, { align: 'justify', maxWidth: maxLineWidth });
//       currentHeight += lineHeight;
//     });
//   });

//   doc.save('processo.pdf');
// }

  // async exportarPDF(): Promise<void> {
  //   const { jsPDF } = await import('jspdf');
  //   const doc = new jsPDF();
  //   const content = await this.editor.save();
  //   content.blocks.forEach((block: { data: { text: string | string[]; }; }, i: number) => {
  //     doc.text(block.data.text, 10, 10 + i * 10);
  //   });
  //   doc.save('processo.pdf');
  // }




}

function html2canvas(arg0: HTMLElement | null, arg1: { scale: number; useCORS: boolean; }) {
  throw new Error('Function not implemented.');
}
