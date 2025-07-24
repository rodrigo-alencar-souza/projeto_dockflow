import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Processo } from '../models/processo.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ProcessoService {
  private processosSubject = new BehaviorSubject<Processo[]>([]);
  processos$ = this.processosSubject.asObservable();

  private processoSelecionado: Processo | null = null;
  private indiceEdicao: number | null = null;

  constructor(private auth: AuthService) {
    // Mock inicial
    this.processosSubject.next([
      {
        nome: 'Projeto estrutural',
        setor: 'engenharia',
        cargo: 'Engenheiro Civil',
        processo: 'Desenvolvimento de projeto',
        descricao: 'Criação e revisão de projetos estruturais para obras internas',
        passos: ['Levantamento', 'Modelagem', 'Validação técnica'],
        sigiloso: true
      },
      {
        nome: 'Linha de montagem',
        setor: 'producao',
        cargo: 'Supervisor de Produção',
        processo: 'Montagem de produtos finais',
        descricao: 'Controle de etapas da produção e supervisão de qualidade',
        passos: ['Preparação de peças', 'Montagem', 'Inspeção'],
        sigiloso: false
      }
    ]);
  }

  getProcessosVisiveis(): Processo[] {
    const setorLogado = this.auth.getSetor();

    return this.processosSubject.value.filter(processo => {
      // Se for sigiloso, aparece somente no setor correspondente
      if (processo.sigiloso) {
        return processo.setor === setorLogado;
      }

      // Se NÃO for sigiloso, aparece somente se for do tipo 'geral'
      return processo.setor === 'geral';
    });
  }
  
  removerProcesso(index: number): void {
    const processos = [...this.processosSubject.value];
    processos.splice(index, 1);
    this.processosSubject.next(processos);
  }

  adicionarProcesso(novoProcesso: Processo): void {
    const processos = [...this.processosSubject.value, novoProcesso];
    this.processosSubject.next(processos);
  }

  atualizarProcesso(index: number, processoAtualizado: Processo): void {
    const processos = [...this.processosSubject.value];
    processos[index] = processoAtualizado;
    this.processosSubject.next(processos);
  }

  setIndiceEdicao(index: number | null): void {
    this.indiceEdicao = index;
  }

  getIndiceGlobal(processo: Processo): number {
    return this.processosSubject.value.findIndex(p =>
      p.nome === processo.nome &&
      p.setor === processo.setor &&
      p.processo === processo.processo &&
      p.descricao === processo.descricao
    );
  }
  
  getIndiceEdicao(): number | null {
    return this.indiceEdicao;
  }

  getProcessoPorIndice(index: number): Processo | null {
    return this.processosSubject.value[index] || null;
  }
}
