// src/app/card/card.component.ts
import { Component, OnInit } from '@angular/core';
import { ProcessoService } from '../service/processo.service';
import { Processo } from '../models/processo.model';
import { Router } from '@angular/router';
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
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  processosPorSetor: Processo[] = [];

  constructor(
    private processoService: ProcessoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.atualizarLista();
  }

  atualizarLista(): void {
    this.processosPorSetor = this.processoService.getProcessosVisiveis();
  }

  abrirDetalhes(processo: Processo): void {
    this.processoService.setProcessoSelecionado(processo);
    this.router.navigate(['/detail-process']);
  }

  editarProcesso(index: number): void {
    const processo = this.processosPorSetor[index];
    this.processoService.setProcessoSelecionado(processo);
    this.router.navigate(['/editar-processo']);
  }

  excluirProcesso(index: number): void {
    this.processoService.removerProcesso(index);
    this.atualizarLista();
  }

  Process_button_navigate(): void {
    console.log('Navegar para adicionar processo');
  }
}
