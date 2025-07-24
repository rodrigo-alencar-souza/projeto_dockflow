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
    this.processosSubject.next([
      {
        id: '1',
        nome: 'Projeto estrutural',
        setor: 'engenharia',
        cargo: 'Engenheiro Civil',
        processo: 'Desenvolvimento de projeto',
        descricao: 'Criação e revisão de projetos estruturais para obras internas',
        passos: ['Levantamento', 'Modelagem', 'Validação técnica'],
        sigiloso: true
      },
      {
        id: '2',
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
    return this.processosSubject.value.filter(processo =>
      processo.sigiloso
        ? processo.setor === setorLogado
        : processo.setor === 'geral'
    );
  }

  setProcessoSelecionado(processo: Processo): void {
  this.processoSelecionado = processo;
  this.indiceEdicao = this.getIndiceGlobal(processo);
}

  clearEdicao(): void {
    this.indiceEdicao = null;
  }

  getIndiceGlobal(processo: Processo): number {
    return this.processosSubject.value.findIndex(p => p.id === processo.id);
  }

  getIndiceEdicao(): number | null {
    return this.indiceEdicao;
  }

  getProcessoPorIndice(index: number): Processo | null {
    return this.processosSubject.value[index] || null;
  }

  atualizarProcesso(index: number, processoAtualizado: Processo): void {
    const processos = [...this.processosSubject.value];
    processos[index] = processoAtualizado;
    this.processosSubject.next(processos);
  }

  adicionarProcesso(novoProcesso: Processo): void {
    const processos = [...this.processosSubject.value, novoProcesso];
    this.processosSubject.next(processos);
  }

  removerProcesso(index: number): void {
    const processos = [...this.processosSubject.value];
    processos.splice(index, 1);
    this.processosSubject.next(processos);
  }
}
