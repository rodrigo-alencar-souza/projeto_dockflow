import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; 
import { MatRadioModule } from '@angular/material/radio'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUserService } from '../service/api.user.service';

@Component({
  selector: 'app-user-sign-up',
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatRadioModule,
    MatButtonModule, MatCardModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './user-sign-up.html',
  styleUrl: './user-sign-up.scss'
})


export class UserSignUp { 

Back_button_navigate(): void {
      this.router.navigate(['home']);
    }  

setores: string[] = ["Geral", "Engenharia", "Fiscal", "Produção"]
cargos: string[] = ["Diretor", "Gerente", "Supervisor", "Analista", "Técnico", "Estagiário"]

registerForm : FormGroup;

ocultarSenha = true;

alternarSenha(): void {
  this.ocultarSenha = !this.ocultarSenha;
}


// Validador para comparar senha e confirmar_senha
 senhaConfirmadaValidator(): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
    const senha = formGroup.get('senha')?.value;
    const confirmarSenha = formGroup.get('confirmar_senha')?.value;

    return senha === confirmarSenha ? null : { senhaNaoConfere: true };
  };
}

constructor(private router: Router, private apiuserService: ApiUserService, private fb: FormBuilder) { 
  this.registerForm = this.fb.group({ 
    nome: ['', Validators.required], 
    idade: ['', [Validators.required,Validators.pattern(/^\d+$/), Validators.min(0)]], 
    setor: ['', Validators.required], 
    cargo: ['', Validators.required], 
    email: ['', [Validators.required, Validators.email]], 
    senha: ['', [Validators.required, Validators.minLength(6)]], 
    confirmar_senha: ['', Validators.required] }, { validators: this.senhaConfirmadaValidator() }); }



    

onSubmit(): void { 
  if (this.registerForm.valid) 
    { 
       const dadosUsuario = this.registerForm.value;
       delete dadosUsuario.confirmar_senha;
       dadosUsuario.idade = Number(dadosUsuario.idade);
       dadosUsuario.setor = dadosUsuario.setor.toLowerCase();
       dadosUsuario.cargo = dadosUsuario.cargo.toLowerCase();


       const jsonPayload = JSON.stringify(dadosUsuario);



       console.log('Dados do formulário:', jsonPayload); // Aqui você pode enviar os dados para um serviço ou backend } } } 

    this.apiuserService.postDados(dadosUsuario).subscribe({
      next: (resposta) => {
        console.log('Usuário cadastrado com sucesso:', resposta);
        this.router.navigate(['home']); // redireciona após cadastro
      },
      error: (erro) => {
        console.error('Erro ao cadastrar usuário:', erro);
      }
    });

    }}}


