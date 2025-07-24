import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Processo } from '../models/processo.model';
import { ProcessoService } from '../service/process.service';
import { MatDialog } from '@angular/material/dialog';
import { ProcessoDetailComponent } from '../detail.process/detail.process';
import { SignUp } from '../sign-up/sign-up';



@Component({
  selector: 'app-card',
  standalone: true, // ← Isso precisa estar aqui
  imports: [CommonModule, MatCardModule, MatListModule, MatChipsModule, MatMenuModule, MatIcon, MatIconModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
 @Input() setor: string = '';
  processosPorSetor: Processo[] = [];
  
  isActive = false;

  constructor(private processoService: ProcessoService, private dialog: MatDialog, private router: Router) {}

  Process_button_navigate(): void {
        this.router.navigate(['cadastro-processo']);
      }

  ngOnInit() {
    this.processoService.processos$.subscribe(processos => {
      this.processosPorSetor = processos.filter((p) => p.setor === this.setor);
    });
  }

  // editarProcesso(index: number, processo: Processo): void {
  //   // abrir um diálogo de edição, ou navegar para o formulário com os dados preenchidos
  //   // Aqui simplificamos com um prompt
  //   const novoTitulo = prompt('Novo nome do processo:', processo.processo);
  //   if (novoTitulo !== null) {
  //     const processoEditado = { ...processo, processo: novoTitulo };
  //     this.processoService.atualizarProcesso(index, processoEditado);
  //   }
  // }

//   editarProcesso(index: number, processo: Processo): void {
//   const dialogRef = this.dialog.open(SignUp, {
//     width: '600px',
//     data: { processoEditado: processo, indexEdicao: index },
//   });

//   dialogRef.componentInstance.atualizarProcesso.subscribe(({ processo, index }) => {
//     this.processoService.atualizarProcesso(index, processo);
//   });
// }

  editarProcesso(index: number): void {
  this.router.navigate(['/editar-processo', index]);
}



  excluirProcesso(index: number): void {
    const confirmacao = confirm('Tem certeza que deseja excluir este processo?');
    if (confirmacao) {
      this.processoService.removerProcesso(index);
    }
  }

  abrirDetalhes(processo: Processo): void {
  this.dialog.open(ProcessoDetailComponent, {
    width: '150mm',      // para caber o conteúdo A4 230mm
    height: 'auto',
    data: processo
  });
}


}