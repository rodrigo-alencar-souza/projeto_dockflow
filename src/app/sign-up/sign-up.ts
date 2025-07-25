import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { ProcessoService } from '../service/processo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Processo } from '../models/processo.model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.scss']
})
export class SignUp implements OnInit {
  registerForm!: FormGroup;
  indexEdicao: number | null = null;

  setores: string[] = ['Geral', 'Engenharia', 'Fiscal', 'Produção'];
  cargos: string[] = [
    'Diretor',
    'Gerente',
    'Supervisor',
    'Analista',
    'Técnico',
    'Estagiário'
  ];

  constructor(
    private snackBar: MatSnackBar,
    private processoService: ProcessoService,
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nome: ['', Validators.required],
      setor: ['', Validators.required],
      cargo: ['', Validators.required],
      processo: ['', Validators.required],
      descricao: [''],
      passos: [''],
      sigiloso: ['nao', Validators.required]
    });

    this.indexEdicao = this.processoService.getIndiceEdicao();

    if (this.indexEdicao !== null) {
      const processo = this.processoService.getProcessoPorIndice(this.indexEdicao);
      if (processo) {
        this.registerForm.patchValue({
          nome: processo.nome,
          setor: processo.setor,
          cargo: processo.cargo,
          processo: processo.processo,
          descricao: processo.descricao,
          passos: processo.passos.join('\n'),
          sigiloso: processo.sigiloso ? 'sim' : 'nao'
        });
      }
    } else {
      // Preenche setor automaticamente apenas se não estiver editando
      const setorLogado = this.auth.getSetor();
      this.registerForm.patchValue({ setor: setorLogado });
    }
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    const sigiloso = this.registerForm.value.sigiloso === 'sim';

    const setorFinal = this.indexEdicao !== null
      ? this.registerForm.value.setor
      : (sigiloso ? this.auth.getSetor() : this.registerForm.value.setor);

    const id = this.indexEdicao !== null
      ? this.processoService.getProcessoPorIndice(this.indexEdicao)?.id || uuidv4()
      : uuidv4();

    const dados: Processo = {
      id,
      nome: this.registerForm.value.nome,
      setor: setorFinal,
      cargo: this.registerForm.value.cargo,
      processo: this.registerForm.value.processo,
      descricao: this.registerForm.value.descricao,
      passos: this.registerForm.value.passos
        .split('\n')
        .map((p: string) => p.trim())
        .filter((p: string) => p.length > 0),
      sigiloso
    };

    if (this.indexEdicao !== null) {
      this.processoService.atualizarProcesso(this.indexEdicao, dados);
      this.snackBar.open('Processo atualizado com sucesso!', '', { duration: 3000 });
    } else {
      this.processoService.adicionarProcesso(dados);
      this.snackBar.open('Processo cadastrado com sucesso!', '', { duration: 3000 });
    }

    this.router.navigate(['home']);
  }

  Back_button_navigate(): void {
    this.router.navigate(['home']);
  }
}
