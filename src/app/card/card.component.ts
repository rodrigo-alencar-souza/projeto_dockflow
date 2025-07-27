import { Component, OnInit } from '@angular/core';
import { ProcessoService } from '../service/process.service';
import { Processo } from '../models/processo.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DetailProcess } from '../detail.process/detail.process';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  processosPorSetor: Processo[] = [];

  constructor(
    private processoService: ProcessoService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.processoService.processos$.subscribe(() => {
      this.atualizarLista();
    });
  }

  atualizarLista(): void {
    this.processosPorSetor = this.processoService.getProcessosVisiveis();
  }

  abrirDetalhes(processo: Processo): void {
    this.dialog.open(DetailProcess, {
      width: '800px',
      data: processo
    });
  }

  editarProcesso(index: number): void {
    const processoVisivel = this.processosPorSetor[index];
    const indexGlobal = this.processoService.getIndiceGlobal(processoVisivel);
    this.processoService.setProcessoSelecionado(processoVisivel);
    this.router.navigate(['/sign-up']); 
  }

  excluirProcesso(index: number): void {
    const processoVisivel = this.processosPorSetor[index];
    const indexGlobal = this.processoService.getIndiceGlobal(processoVisivel);
    this.processoService.removerProcesso(indexGlobal);
  }

  Process_button_navigate(): void {
    this.processoService.clearEdicao();
    this.router.navigate(['/sign-up']);
  }
}
