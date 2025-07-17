import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; 
import { MatRadioModule } from '@angular/material/radio'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatCardModule } from '@angular/material/card'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


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

  
  Back_button_navigate(): void {
      this.router.navigate(['home']);
    }
  
  setores: string[] = ["Geral", "Engenharia", "Fiscal", "Produção"]
  cargos: string[] = ["Diretor", "Gerente", "Supervisor", "Analista", "Técnico", "Estagiário"]
  registerForm : FormGroup;

constructor(private router: Router, private fb: FormBuilder) { this.registerForm = this.fb.group({ nome: ['', Validators.required], setor: ['', Validators.required], cargo: ['', Validators.required], processo: ['', Validators.required], descricao: [''], passos: [''], sigiloso: ['nao', Validators.required] }); }
onSubmit(): void { if (this.registerForm.valid) { console.log('Dados do formulário:', this.registerForm.value); // Aqui você pode enviar os dados para um serviço ou backend } } } 
}}}
