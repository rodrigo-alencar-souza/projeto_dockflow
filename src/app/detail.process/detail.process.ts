import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { ProcessoService } from '../service/process.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-visualizacao',
  standalone: true,
  imports: [Sidebar],
  templateUrl: './detail.process.html',
  styleUrls: ['./detail.process.scss']
})
export class VisualizacaoComponent implements OnInit, AfterViewInit {
  editor: any;
  processo: any;

  constructor(
    private processoService: ProcessoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.processo = this.processoService.getProcessoSelecionado();
  }

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      // Se não for browser, não tenta criar editor
      return;
    }

    // Importa EditorJS e plugins dinamicamente só no browser
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
      import('@editorjs/image'),
    ]);

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
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: 'http://localhost:3000/uploadFile',
              byUrl: 'http://localhost:3000/fetchUrl',
            }
          }
        }
      },
      data: {
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

  async exportarPDF(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const { jsPDF } = await import('jspdf');

    const doc = new jsPDF('p', 'mm', 'a4');
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxLineWidth = pageWidth - margin * 2;
    const lineHeight = 7;
    let currentHeight = margin;

    const content = await this.editor.save();

    for (const block of content.blocks) {
      switch (block.type) {
        case 'header': {
          const text = block.data.text || '';
          const level = block.data.level || 1;
          const fontSize = 24 - (level * 4); // Tamanho menor para níveis maiores
          doc.setFontSize(fontSize);
          doc.setFont('helvetica', 'bold');
          const lines = doc.splitTextToSize(text, maxLineWidth);
          if (currentHeight + lines.length * lineHeight > doc.internal.pageSize.getHeight() - margin) {
            doc.addPage();
            currentHeight = margin;
          }
          doc.text(lines, margin, currentHeight);
          currentHeight += lines.length * lineHeight + 5;
          break;
        }

        case 'paragraph': {
          const text = block.data.text || '';
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
          const lines = doc.splitTextToSize(text, maxLineWidth);
          if (currentHeight + lines.length * lineHeight > doc.internal.pageSize.getHeight() - margin) {
            doc.addPage();
            currentHeight = margin;
          }
          doc.text(lines, margin, currentHeight);
          currentHeight += lines.length * lineHeight + 5;
          break;
        }

        case 'list': {
          const items = block.data.items || [];
          const style = block.data.style; // 'ordered' ou 'unordered'

          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');

          for (let i = 0; i < items.length; i++) {
            const prefix = style === 'ordered' ? `${i + 1}. ` : '• ';
            const lines = doc.splitTextToSize(prefix + items[i], maxLineWidth);
            if (currentHeight + lines.length * lineHeight > doc.internal.pageSize.getHeight() - margin) {
              doc.addPage();
              currentHeight = margin;
            }
            doc.text(lines, margin, currentHeight);
            currentHeight += lines.length * lineHeight;
          }
          currentHeight += 5;
          break;
        }

        case 'checklist': {
          const items = block.data.items || [];
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
          for (const item of items) {
            const checkbox = item.checked ? '[x] ' : '[ ] ';
            const lines = doc.splitTextToSize(checkbox + item.text, maxLineWidth);
            if (currentHeight + lines.length * lineHeight > doc.internal.pageSize.getHeight() - margin) {
              doc.addPage();
              currentHeight = margin;
            }
            doc.text(lines, margin, currentHeight);
            currentHeight += lines.length * lineHeight;
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
          if (currentHeight + quoteLines.length * lineHeight > doc.internal.pageSize.getHeight() - margin) {
            doc.addPage();
            currentHeight = margin;
          }
          doc.text(quoteLines, margin + 10, currentHeight);
          currentHeight += quoteLines.length * lineHeight;

          if (caption) {
            const capLines = doc.splitTextToSize(`— ${caption}`, maxLineWidth);
            if (currentHeight + capLines.length * lineHeight > doc.internal.pageSize.getHeight() - margin) {
              doc.addPage();
              currentHeight = margin;
            }
            doc.text(capLines, margin + 20, currentHeight);
            currentHeight += capLines.length * lineHeight + 5;
          }
          break;
        }

        case 'code': {
          const codeText = block.data.code || block.data.text || '';
          doc.setFont('courier', 'normal');
          doc.setFontSize(10);
          const codeLines = doc.splitTextToSize(codeText, maxLineWidth);
          if (currentHeight + codeLines.length * lineHeight > doc.internal.pageSize.getHeight() - margin) {
            doc.addPage();
            currentHeight = margin;
          }
          // Fundo cinza claro para bloco de código
          const blockHeight = codeLines.length * lineHeight + 4;
          doc.setFillColor(230, 230, 230);
          doc.rect(margin - 2, currentHeight - lineHeight + 2, maxLineWidth + 4, blockHeight, 'F');
          doc.setTextColor(30, 30, 30);
          doc.text(codeLines, margin, currentHeight);
          currentHeight += blockHeight + 5;
          // Restaura cor do texto para preto
          doc.setTextColor(0, 0, 0);
          break;
        }

        case 'table': {
          const content = block.data.content || [];
          if (content.length === 0) break;

          const colWidths = [];
          const colCount = content[0].length;

          // largura por coluna aproximada
          const colWidth = maxLineWidth / colCount;

          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');

          // altura inicial da tabela
          let tableTop = currentHeight;

          for (let row = 0; row < content.length; row++) {
            let rowHeight = 0;
            for (let col = 0; col < colCount; col++) {
              const cellText = content[row][col] || '';
              const lines = doc.splitTextToSize(cellText, colWidth - 4);
              if (tableTop + (lines.length * lineHeight) > doc.internal.pageSize.getHeight() - margin) {
                doc.addPage();
                tableTop = margin;
              }
              // desenha borda da célula
              doc.rect(margin + col * colWidth, tableTop, colWidth, lines.length * lineHeight);
              doc.text(lines, margin + col * colWidth + 2, tableTop + lineHeight);
              rowHeight = Math.max(rowHeight, lines.length * lineHeight);
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
              if (currentHeight + imgProps.height > doc.internal.pageSize.getHeight() - margin) {
                doc.addPage();
                currentHeight = margin;
              }
              doc.addImage(url, imgProps.format, margin, currentHeight, imgProps.width, imgProps.height);
              currentHeight += imgProps.height + 5;
            } catch {
              // se falhar, apenas pula a imagem
            }
          }
          break;
        }

        default: {
          // Se tiver outros tipos, tenta só texto plano
          const text = block.data.text || '';
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
          const lines = doc.splitTextToSize(text, maxLineWidth);
          if (currentHeight + lines.length * lineHeight > doc.internal.pageSize.getHeight() - margin) {
            doc.addPage();
            currentHeight = margin;
          }
          doc.text(lines, margin, currentHeight);
          currentHeight += lines.length * lineHeight + 5;
        }
      }
    }

    doc.save('processo.pdf');
  }

  // Função auxiliar para obter dimensões e formato da imagem
  private getImageProps(url: string): Promise<{ width: number; height: number; format: string }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const maxWidth = 180; // max largura da imagem no PDF em mm
        const aspectRatio = img.width / img.height;
        let width = maxWidth;
        let height = width / aspectRatio;

        // Ajuste de formato para jsPDF: png ou jpeg
        const format = url.endsWith('.png') ? 'PNG' : 'JPEG';

        resolve({ width, height, format });
      };
      img.onerror = reject;
      img.src = url;
    });
  }
}
