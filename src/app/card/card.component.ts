import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessoService } from '../service/process.service';
import { Processo } from '../models/processo.model';
import { MatDialog } from '@angular/material/dialog';
import { VisualizacaoComponent } from '../detail.process/detail.process';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../service/auth.service';

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
  abaSelecionada: string = 'geral';

  constructor(
    private processoService: ProcessoService,
    private router: Router,
    private route: ActivatedRoute,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      const rotaAtual = urlSegments[0]?.path?.toLowerCase() || 'geral';
      this.abaSelecionada = rotaAtual;
      this.atualizarLista();
    });

    this.processoService.processos$.subscribe(() => {
      this.atualizarLista();
    });
  }

  atualizarLista(): void {
    const todosProcessos = this.processoService.getTodosProcessos();
    const isAdmin = this.auth.getUserRole() === 'admin';
    const setorUsuario = this.auth.getSetor();

    this.processosPorSetor = todosProcessos.filter((processo: Processo) => {
      if (isAdmin) {
        return processo.setor === this.abaSelecionada || processo.setor === 'geral';
      } else {
        return processo.setor === this.abaSelecionada &&
          (processo.setor === setorUsuario || processo.setor === 'geral');
      }
    });
  }

  abrirDetalhes(processo: Processo): void {
  this.processoService.setProcessoSelecionado(processo);
  this.router.navigate(['/detail-process']);
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
