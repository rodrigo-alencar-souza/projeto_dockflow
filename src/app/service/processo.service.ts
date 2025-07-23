// src/app/service/processo.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Processo } from '../models/processo.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ProcessoService {
  private processosSubject = new BehaviorSubject<Processo[]>([
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
    },
    {
      nome: 'Auditoria tributária',
      setor: 'fiscal',
      cargo: 'Analista Fiscal',
      processo: 'Revisão de tributos e conformidade',
      descricao: 'Auditoria de documentos fiscais e validação de impostos devidos',
      passos: ['Análise de notas', 'Conferência de ICMS/IPI', 'Reporte contábil'],
      sigiloso: true
    }
  ]);

  processos$ = this.processosSubject.asObservable();
  private processoSelecionado: Processo | null = null;

  constructor(private auth: AuthService) {}

  getProcessosVisiveis(): Processo[] {
    const setorLogado = this.auth.getSetor();
    return this.processosSubject.value.filter(
      processo => processo.setor === setorLogado || processo.setor === 'geral'
    );
  }

  removerProcesso(index: number): void {
    const processos = [...this.processosSubject.value];
    processos.splice(index, 1);
    this.processosSubject.next(processos);
  }

  setProcessoSelecionado(processo: Processo): void {
    this.processoSelecionado = processo;
  }

  getProcessoSelecionado(): Processo | null {
    return this.processoSelecionado;
  }

  adicionarProcesso(novoProcesso: Processo): void {
  const processos = this.processosSubject.value;
  this.processosSubject.next([...processos, novoProcesso]);
  }

  atualizarProcesso(index: number, processoAtualizado: Processo): void {
    const processos = [...this.processosSubject.value];
    processos[index] = processoAtualizado;
    this.processosSubject.next(processos);
  }

  getProcessoPorIndice(index: number): Processo | null {
    const processos = this.processosSubject.value;
    return processos[index] || null;
  }

}
