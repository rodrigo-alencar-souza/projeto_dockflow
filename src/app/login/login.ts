import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; 
import { MatRadioModule } from '@angular/material/radio'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatCardModule } from '@angular/material/card'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [MatInputModule, MatFormFieldModule, MatSelectModule, MatRadioModule, 
    MatButtonModule, MatCardModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  loginForm : FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService)
  {this.loginForm = this.fb.group({ email: ['', Validators.required], password: ['', Validators.required]})}
  
  Back_button_navigate(): void {
      this.router.navigate(['home']);
    }
  
  Register_navigate(): void {
      this.router.navigate(['cadastro-usuario']);
    }  

  onSubmit(): void {
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;

    if (this.auth.login(email, password)) {
      const setor = this.auth.getSetor();
      this.router.navigate([`/${setor}`]);
    } else {
      alert('Credenciais inválidas');
    }
  }
}   
}