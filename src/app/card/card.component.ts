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
import { PerfilUsuario } from '../service/auth.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
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
    public auth: AuthService,
    private dialog: MatDialog,         // ✅ MatDialog aqui
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,     
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
    const isAdmin = this.auth.getUserRole() === PerfilUsuario.ADM;
    const setorUsuario = this.auth.getSetor();

    this.processosPorSetor = todosProcessos.filter((processo: Processo) => {
      if (this.abaSelecionada === 'geral') {
        return processo.setor === 'geral';
      }

      if (isAdmin) {
        return processo.setor === this.abaSelecionada;
      }

      return processo.setor === this.abaSelecionada &&
            processo.setor === setorUsuario;
    });

    this.processosPorSetor = [...this.processosPorSetor]; // ✅ força nova referência
    this.cdr.detectChanges(); // ✅ força re-renderização
  }



  abrirDetalhes(processo: Processo): void {
  this.processoService.setProcessoSelecionado(processo);
  this.router.navigate(['/detail-process']);
}

  editarProcesso(index: number): void {
    const processoVisivel = this.processosPorSetor[index];
    const indexGlobal = this.processoService.getIndiceGlobal(processoVisivel);

    this.processoService.setIndiceEdicao(indexGlobal); // ✅ define índice
    this.processoService.setProcessoSelecionado(processoVisivel); // opcional

    this.router.navigate(['/sign-up']); // ✅ navega para o formulário
  }


  excluirProcesso(index: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const processoVisivel = this.processosPorSetor[index];
        const indexGlobal = this.processoService.getIndiceGlobal(processoVisivel);

        this.processoService.removerProcesso(indexGlobal);

        this.processosPorSetor.splice(index, 1);
        this.processosPorSetor = [...this.processosPorSetor]; // 🔄 força nova referência
        this.cdr.detectChanges(); // 💥 força o Angular a re-renderizar a view


        this.snackBar.open('Processo excluído com sucesso', 'Fechar', {
          duration: 3000
        });
      }
    });
  }


  Process_button_navigate(): void {
    this.processoService.clearEdicao();
    this.router.navigate(['/sign-up']);
  }
}
