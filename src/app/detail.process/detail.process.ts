import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { ProcessoService } from '../service/process.service';
import { Sidebar } from '../sidebar/sidebar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmSaveComponent } from '../confirm-save/confirm-save';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { lastValueFrom } from 'rxjs';
import { Processo } from '../service/process.service';


interface EditorJSBlock {
    type: string;
    data: {
      text: string;
      [key: string]: any;
    };
  }

  interface EditorJSOutput {
    blocks: EditorJSBlock[];
  }


@Component({
  selector: 'app-detail-process',
  standalone: true,
  imports: [
    Sidebar,
    CommonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './detail.process.html',
  styleUrls: ['./detail.process.scss']
})
export class VisualizacaoComponent implements OnInit, AfterViewInit {
  processo: any;
  editor: any;

  constructor(
    private processoService: ProcessoService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.processo = this.processoService.getProcessoSelecionado();
  }

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const [
      { default: EditorJS },
      { default: Header },
      { default: Paragraph },
      { default: List },
      { default: Quote },
      { default: CodeTool },
      { default: Table },
      { default: Delimiter },
      { default: Checklist },
      { default: ImageTool }
    ] = await Promise.all([
      import('@editorjs/editorjs'),
      import('@editorjs/header'),
      import('@editorjs/paragraph'),
      import('@editorjs/list'),
      import('@editorjs/quote'),
      import('@editorjs/code'),
      import('@editorjs/table'),
      import('@editorjs/delimiter'),
      import('@editorjs/checklist'),
      import('@editorjs/image')
    ]);

    const processoId = this.processo?.id || 'default';
    const savedData = localStorage.getItem(`editorjs_${processoId}`);
    const parsedData = savedData ? JSON.parse(savedData) : null;

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
        checklist: Checklist,
        image: ImageTool
      },
      data: parsedData || {
        blocks: [
          {
            type: 'header',
            data: {
              text: this.processo?.processo || 'Sem título disponível.',
              level: 2,
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
          },
          {
            type: 'header',
            data: { text: `Setor: ${this.processo?.setor}`, level: 3 }
          }
        ]
      }
    });
  }

  
  private extrairTitulo(content: any): string {
    const headerBlock = content.blocks.find((b: any) => b.type === 'header');
    return headerBlock?.data?.text || this.processo?.processo || 'Sem título';
  }

  extrairDescricao(content: EditorJSOutput): string {
    const bloco = content.blocks.find(b => b.type === 'paragraph' && b.data.text.includes('Descrição:'));
    return bloco ? bloco.data.text.replace('Descrição:', '').trim() : this.processo?.descricao || '';
  }

  extrairSetor(content: EditorJSOutput): string {
    const bloco = content.blocks.find(b => b.type === 'paragraph' && b.data.text.includes('Setor:'));
    return bloco ? bloco.data.text.replace('Setor:', '').trim() : this.processo?.setor || '';
  }

  extrairCargo(content: EditorJSOutput): string {
    const bloco = content.blocks.find(b => b.type === 'paragraph' && b.data.text.includes('Cargo:'));
    return bloco ? bloco.data.text.replace('Cargo:', '').trim() : this.processo?.cargo || '';
  }

  async salvarEdicao(): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmSaveComponent, {
      width: '350px'
    });

    const result = await lastValueFrom(dialogRef.afterClosed());

    if (result && this.editor) {
      const content = await this.editor.save();
      const processoId = this.processo?.id || 'default';
      localStorage.setItem(`editorjs_${processoId}`, JSON.stringify(content));
      this.snackBar.open('✅ Alterações salvas com sucesso!', 'Fechar', {
        duration: 3000
      });

      if (this.processo) {
        const novoTitulo = this.extrairTitulo(content);
        const novaDescricao = this.extrairDescricao(content);
        const novoSetor = this.extrairSetor(content);
        const novoCargo = this.extrairCargo(content);

        const processoAtualizado: Processo = {
          ...this.processo,
          processo: novoTitulo,
          descricao: novaDescricao,
          setor: novoSetor,
          cargo: novoCargo
        };

        const indexGlobal = this.processoService.getIndiceGlobal(this.processo);
        this.processoService.atualizarProcesso(indexGlobal, processoAtualizado);
      }
    }

  }

  async exportarPDF(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF('p', 'mm', 'a4');
    const margin = 20;
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxLineWidth = pageWidth - margin * 2;
    const lineHeight = 7;
    let currentHeight = margin;

    const content = await this.editor.save();

    for (const block of content.blocks) {
      const ensureSpace = (requiredHeight: number) => {
        if (currentHeight + requiredHeight > pageHeight - margin) {
          doc.addPage();
          currentHeight = margin;
        }
      };

      switch (block.type) {
        case 'header': {
          const text = block.data.text || '';
          const level = block.data.level || 1;
          const fontSize = 24 - (level * 4);
          doc.setFontSize(fontSize);
          doc.setFont('helvetica', 'bold');
          const lines = doc.splitTextToSize(text, maxLineWidth);
          ensureSpace(lines.length * lineHeight + 5);
          doc.text(lines, margin, currentHeight);
          currentHeight += lines.length * lineHeight + 5;
          break;
        }

        case 'paragraph': {
          const text = block.data.text || '';
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
          const lines = doc.splitTextToSize(text, maxLineWidth);
          ensureSpace(lines.length * lineHeight + 5);

          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const isLastLine = i === lines.length - 1;
            const words = line.trim().split(/\s+/);
            const wordWidths = words.map((word: string) => doc.getTextWidth(word));
            const totalWordsWidth = wordWidths.reduce((a: number, b: number) => a + b, 0);
            const spaceCount = words.length - 1;
            const remainingSpace = maxLineWidth - totalWordsWidth;
            const spaceWidth = spaceCount > 0 ? (isLastLine ? 3 : remainingSpace / spaceCount) : 0;

            let x = margin;
            for (let j = 0; j < words.length; j++) {
              doc.text(words[j], x, currentHeight);
              x += wordWidths[j] + spaceWidth;
            }
            currentHeight += lineHeight;
          }

          currentHeight += 5;
          break;
        }

        case 'list': {
          const items: string[] = block.data.items || [];
          const style = block.data.style;
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');

          for (let i = 0; i < items.length; i++) {
            const prefix = style === 'ordered' ? `${i + 1}. ` : '• ';
            const itemText = typeof items[i] === 'string' ? items[i] : JSON.stringify(items[i]);
            const lines = doc.splitTextToSize(prefix + itemText, maxLineWidth);
            ensureSpace(lines.length * lineHeight + 5);
            doc.text(lines, margin, currentHeight);
            currentHeight += lines.length * lineHeight + 2;
          }

          currentHeight += 5;
          break;
        }

        case 'checklist': {
          const items: { text: string; checked: boolean }[] = block.data.items || [];
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
          for (const item of items) {
            const checkbox = item.checked ? '[x] ' : '[ ] ';
            const lines = doc.splitTextToSize(checkbox + item.text, maxLineWidth);
            ensureSpace(lines.length * lineHeight + 5);
            doc.text(lines, margin, currentHeight);
            currentHeight += lines.length * lineHeight + 2;
          }
          currentHeight += 5;
          break;
        }

        case 'quote': {
          const text = block.data.text || '';
          const caption = block.data.caption || '';
          doc.setFontSize(14);
          doc.setFont('helvetica', 'italic');
          const quoteLines = doc.splitTextToSize(`"${text}"`, maxLineWidth);
          ensureSpace(quoteLines.length * lineHeight + 10);
          doc.text(quoteLines, margin + 10, currentHeight);
          currentHeight += quoteLines.length * lineHeight;

          if (caption) {
            const capLines = doc.splitTextToSize(`— ${caption}`, maxLineWidth);
            ensureSpace(capLines.length * lineHeight + 5);
            doc.text(capLines, margin + 20, currentHeight);
            currentHeight += capLines.length * lineHeight;
          }

          currentHeight += 5;
          break;
        }

        case 'code': {
          const codeText = block.data.code || block.data.text || '';
          doc.setFont('courier', 'normal');
          doc.setFontSize(10);
          const codeLines = doc.splitTextToSize(codeText, maxLineWidth);
          const blockHeight = codeLines.length * lineHeight + 4;
          ensureSpace(blockHeight + 5);
          doc.setFillColor(230, 230, 230);
          doc.rect(margin - 2, currentHeight - lineHeight + 2, maxLineWidth + 4, blockHeight, 'F');
          doc.setTextColor(30, 30, 30);
          doc.text(codeLines, margin, currentHeight);
          currentHeight += blockHeight + 5;
          doc.setTextColor(0, 0, 0);
          break;
        }

        case 'table': {
          const content: string[][] = block.data.content || [];
          if (content.length === 0) break;
          const colCount = content[0].length;
          const colWidth = maxLineWidth / colCount;

          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');

          let tableTop = currentHeight;

          for (let row = 0; row < content.length; row++) {
            let rowHeight = 0;
            for (let col = 0; col < colCount; col++) {
              const cellText = content[row][col] || '';
              const lines = doc.splitTextToSize(cellText, colWidth - 4);
              const estimatedHeight = lines.length * lineHeight;

              if (tableTop + estimatedHeight > pageHeight - margin) {
                doc.addPage();
                tableTop = margin;
                currentHeight = margin;
              }

              doc.rect(margin + col * colWidth, tableTop, colWidth, estimatedHeight);
              doc.text(lines, margin + col * colWidth + 2, tableTop + lineHeight);
              rowHeight = Math.max(rowHeight, estimatedHeight);
            }
            tableTop += rowHeight;
          }

          currentHeight = tableTop + 5;
          break;
        }

        case 'image': {
          const file = block.data.file;
          const url = file?.url || block.data.url || '';
          if (url) {
            try {
              const imgProps = await this.getImageProps(url);
              ensureSpace(imgProps.height + 5);
              doc.addImage(url, imgProps.format, margin, currentHeight, imgProps.width, imgProps.height);
              currentHeight += imgProps.height + 5;
            } catch {
              // erro ao carregar imagem
            }
          }
          break;
        }

        default: {
          const text = block.data.text || '';
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
          const lines = doc.splitTextToSize(text, maxLineWidth);
          ensureSpace(lines.length * lineHeight + 5);
          doc.text(lines, margin, currentHeight);
          currentHeight += lines.length * lineHeight + 5;
        }
      }
    }

    doc.save('processo.pdf');
  }


  private getImageProps(url: string): Promise<{ width: number; height: number; format: string }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const maxWidth = 180;
        const aspectRatio = img.width / img.height;
        let width = maxWidth;
        let height = width / aspectRatio;
        const format = url.endsWith('.png') ? 'PNG' : 'JPEG';
        resolve({ width, height, format });
      };
      img.onerror = reject;
      img.src = url;
    });
  }
}
