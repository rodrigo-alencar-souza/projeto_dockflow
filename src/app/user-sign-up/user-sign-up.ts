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

@Component({
  selector: 'app-user-sign-up',
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatRadioModule, 
    MatButtonModule, MatCardModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-sign-up.html',
  styleUrl: './user-sign-up.scss'
})


export class UserSignUp { registerForm : FormGroup;
constructor(private fb: FormBuilder) { this.registerForm = this.fb.group({ nome: ['', Validators.required], idade: ['', [Validators.required, Validators.min(0)]], setor: ['', Validators.required], cargo: ['', Validators.required], email: ['', Validators.required], senha: ['', Validators.required], confirmar_senha: ['', Validators.required] }); }
onSubmit(): void { if (this.registerForm.valid) { console.log('Dados do formulário:', this.registerForm.value); // Aqui você pode enviar os dados para um serviço ou backend } } } 
}}}


