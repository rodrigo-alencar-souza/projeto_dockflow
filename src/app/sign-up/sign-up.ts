import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; 
import { MatRadioModule } from '@angular/material/radio'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatCardModule } from '@angular/material/card'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProcessoService } from '../service/process.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ CommonModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatRadioModule, 
    MatButtonModule, MatCardModule, FormsModule, ReactiveFormsModule
],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss'
})



export class SignUp { 
  
  indexEdicao?: number
  modoEdicao: boolean = false;


  // @Input() processoEditado?: Processo;
  // @Output() atualizarProcesso = new EventEmitter<{ processo: Processo; index: number }>();
  
  Back_button_navigate(): void {
      this.router.navigate(['home']);
    }
  
  processos: any[] = [];  
  setores: string[] = ["Geral", "Engenharia", "Fiscal", "Produção"]
  cargos: string[] = ["Diretor", "Gerente", "Supervisor", "Analista", "Técnico", "Estagiário"]
  registerForm : FormGroup;

constructor(private snackBar: MatSnackBar, private processoService: ProcessoService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { this.registerForm = this.fb.group({ nome: ['', Validators.required], setor: ['', Validators.required], cargo: ['', Validators.required], processo: ['', Validators.required], descricao: [''], passos: [''] }); } //sigiloso: ['nao', Validators.required]

ngOnInit(): void {
  const index = this.route.snapshot.paramMap.get('index');
  if (index !== null) {
    this.indexEdicao = Number(index);
    const processo = this.processoService.getProcessoPorIndice(this.indexEdicao);
    if (processo) {
      this.registerForm.patchValue(processo);
      this.modoEdicao = true;
    }
  }
}



onSubmit(): void { 
  if (this.registerForm.valid) 
    { console.log('Dados do formulário:', this.registerForm.value); // Aqui você pode enviar os dados para um serviço ou backend } } } 
    // const dados = this.registerForm.value;
    // this.processos.push({
    //   nome: dados.processo,
    //   setor: dados.setor,
    //   descricao: dados.descricao
    // });
    // this.registerForm.reset({ sigiloso: 'nao' });
      const dados = this.registerForm.value;

    // this.processoService.adicionarProcesso(this.registerForm.value);



    // if (this.indexEdicao !== undefined) {
    //     this.processoService.atualizarProcesso(this.indexEdicao, dados);
    //   } else {
    //     this.processoService.adicionarProcesso(dados);
    //   }


    if (this.modoEdicao && this.indexEdicao !== undefined) {
      this.processoService.atualizarProcesso(this.indexEdicao, dados);
      this.snackBar.open('Processo atualizado com sucesso!', '', { duration: 3000 });
    } else {
      this.processoService.adicionarProcesso(dados);
      this.snackBar.open('Processo cadastrado com sucesso!', '', { duration: 3000 });
    }



    //     if (this.processoEditado) {
    //   this.atualizarProcesso.emit({ processo: dados, index: this.indexEdicao! });
    // } else {
    //   this.processoService.adicionarProcesso(dados);
    // }

    this.router.navigate(['home']); // ou outro redirecionamento desejado

    }



}}
