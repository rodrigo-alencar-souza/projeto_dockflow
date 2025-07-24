import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Processo } from '../models/processo.model';
import { v4 as uuidv4 } from 'uuid';


@Injectable({ providedIn: 'root' })
export class ProcessoService {
  private processosSubject = new BehaviorSubject<Processo[]>([]);
  processos$ = this.processosSubject.asObservable();

  // adicionarProcesso(novoProcesso: Processo): void {
  //   const processos = this.processosSubject.value;
  //   this.processosSubject.next([...processos, novoProcesso]);
  // }

  
  adicionarProcesso(processo: Processo): void {
    const novoProcesso = { ...processo, id: uuidv4() };
    const processos = [...this.processosSubject.value];
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

getProcessoPorIndice(index: number): Processo | null {
  const processos = this.processosSubject.value;
  return processos[index] || null;
}


removerProcesso(index: number): void {
  const processos = [...this.processosSubject.value];
  processos.splice(index, 1);
  this.processosSubject.next(processos);
}


}