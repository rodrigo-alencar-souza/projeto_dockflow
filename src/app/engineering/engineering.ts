import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { CardComponent } from '../card/card.component';
import { Router } from '@angular/router';
import { Processo } from '../models/processo.model';
import { ProcessoService } from '../service/process.service';

@Component({
  selector: 'app-engineering',
  imports: [RouterModule, Sidebar, CardComponent],
  templateUrl: './engineering.html',
  styleUrl: './engineering.scss'
})
export class Engineering {
  processos: Processo[] = [];

  constructor(private processosService: ProcessoService) {}

  ngOnInit() {
    this.processos = this.processosService.getProcessosVisiveis();
  }
}
