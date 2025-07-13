import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; 
import { MatRadioModule } from '@angular/material/radio'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatCardModule } from '@angular/material/card'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  imports: [MatInputModule, MatFormFieldModule, MatSelectModule, MatRadioModule, 
    MatButtonModule, MatCardModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  loginForm : FormGroup;


  constructor(private router: Router, private fb: FormBuilder )
  {this.loginForm = this.fb.group({ email: ['', Validators.required], password: ['', Validators.required]})}

  Back_button_navigate(): void {
      this.router.navigate(['home']);
    }
  
  Register_navigate(): void {
      this.router.navigate(['cadastro-usuario']);
    }  

  onSubmit(): void { if (this.loginForm.valid) { console.log('Dados do formulário:', this.loginForm.value)}}; // Aqui você pode enviar os dados para um serviço ou backend } } }   
}