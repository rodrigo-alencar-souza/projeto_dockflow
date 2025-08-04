import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {
  private baseUrl = 'http://127.0.0.1:8000'; // substitua pela URL real da API

  // Configurações de headers
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer seu_token_aqui' // descomente e ajuste se precisar de autenticação
    })
  };


  constructor(private http: HttpClient) {}

  getDados(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/`, this.httpOptions);
  }

  postDados(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/`, data, this.httpOptions);
  }

  putDados(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}`, data, this.httpOptions);
  }

  deleteDados(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${id}`, this.httpOptions);
  }
}