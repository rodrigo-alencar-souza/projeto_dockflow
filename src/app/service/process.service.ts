import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Processo } from '../models/processo.model';

@Injectable({ providedIn: 'root' })
export class ProcessoService {
  private processosSubject = new BehaviorSubject<Processo[]>([]);
  processos$ = this.processosSubject.asObservable();

  adicionarProcesso(novoProcesso: Processo): void {
    const processos = this.processosSubject.value;
    this.processosSubject.next([...processos, novoProcesso]);
  }

  obterPorSetor(setor: string): Processo[] {
    return this.processosSubject.value.filter(p => p.setor === setor);
  }

  atualizarProcesso(index: number, processoAtualizado: Processo): void {
  const processos = [...this.processosSubject.value];
  processos[index] = processoAtualizado;
  this.processosSubject.next(processos);
}

removerProcesso(index: number): void {
  const processos = [...this.processosSubject.value];
  processos.splice(index, 1);
  this.processosSubject.next(processos);
}


}