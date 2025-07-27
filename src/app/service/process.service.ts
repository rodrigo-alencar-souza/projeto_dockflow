import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../service/auth.service'; // ajuste o caminho se necessário

export interface Processo {
  id: string;
  nome: string;
  setor: string;
  cargo: string;
  processo: string;
  descricao: string;
  passos: string[];
  sigiloso: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProcessoService {
  private processosSubject = new BehaviorSubject<Processo[]>([]);
  processos$ = this.processosSubject.asObservable();

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
      },
      {
        id: '3',
        nome: 'Auditoria fiscal interna',
        setor: 'fiscal',
        cargo: 'Analista Fiscal',
        processo: 'Revisão de documentação tributária',
        descricao: 'Verificação de notas fiscais e conformidade legal',
        passos: ['Coleta', 'Análise', 'Relatório'],
        sigiloso: true
      },
      {
      id: '4',
      nome: 'Controle de estoque',
      setor: 'producao',
      cargo: 'Auxiliar de Logística',
      processo: 'Gestão de materiais e inventário',
      descricao: 'Monitoramento de entradas/saídas e manutenção de níveis ideais de estoque',
      passos: ['Conferência de materiais', 'Registro no sistema', 'Ajustes de inventário'],
      sigiloso: false
    },
    {
      id: '5',
      nome: 'Planejamento de recursos',
      setor: 'engenharia',
      cargo: 'Engenheiro de Planejamento',
      processo: 'Definição de recursos técnicos para novos projetos',
      descricao: 'Escolha de materiais, equipamentos e estrutura necessária para execução técnica',
      passos: ['Definição de escopo', 'Seleção de recursos', 'Elaboração de plano'],
      sigiloso: true
    },
    {
      id: '6',
      nome: 'Treinamento de integração',
      setor: 'rh',
      cargo: 'Coordenador de RH',
      processo: 'Integração de novos colaboradores',
      descricao: 'Apresentação da empresa, políticas internas e primeiros passos operacionais',
      passos: ['Boas-vindas', 'Apresentação institucional', 'Treinamento de segurança'],
      sigiloso: false
    },
    {
      id: '7',
      nome: 'Processo-geral-teste',
      setor: 'Geral',
      cargo: 'Supervisor',
      processo: 'Integração de novos colaboradores',
      descricao: 'Apresentação da empresa, políticas internas e primeiros passos operacionais',
      passos: ['Boas-vindas', 'Apresentação institucional', 'Treinamento de segurança'],
      sigiloso: false
    }
    ]);
  }

  // 🔍 Filtro baseado no perfil
  getProcessosVisiveis(): Processo[] {
    const todos = this.processosSubject.value;

    if (this.auth.isAdmin()) {
      return todos;
    }

    const setor = this.auth.getSetor();
    return todos.filter(p => p.setor === setor);
  }

  // ✅ Adiciona novo processo
  adicionarProcesso(processo: Processo): void {
    const atual = [...this.processosSubject.value, processo];
    this.processosSubject.next(atual);
  }

  // ✅ Atualiza processo por índice
  atualizarProcesso(index: number, novo: Processo): void {
    const lista = [...this.processosSubject.value];
    lista[index] = novo;
    this.processosSubject.next(lista);
  }

  private processoSelecionado: Processo | null = null;

  setProcessoSelecionado(processo: Processo): void {
    this.processoSelecionado = processo;
  }

  getProcessoSelecionado(): Processo | null {
    return this.processoSelecionado;
  }


  // ✅ Pega processo pelo índice
  getProcessoPorIndice(index: number): Processo | undefined {
    return this.processosSubject.value[index];
  }

  // ✅ Gerencia estado de edição
  getIndiceEdicao(): number | null {
    return this.indiceEdicao;
  }

  setIndiceEdicao(index: number | null): void {
    this.indiceEdicao = index;
  }

  // ✅ Utilitário para exclusão
  removerProcesso(index: number): void {
    const lista = [...this.processosSubject.value];
    lista.splice(index, 1);
    this.processosSubject.next(lista);
  }

  // ✅ Localiza índice global do processo
  getIndiceGlobal(processo: Processo): number {
    return this.processosSubject.value.findIndex(p => p.id === processo.id);
  }

  // ✅ Limpa estado de edição
  clearEdicao(): void {
    this.indiceEdicao = null;
  }
}
