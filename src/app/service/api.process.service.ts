import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiProcessService {
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
    return this.http.get(`${this.baseUrl}/process/`, this.httpOptions);
  }

  postDados(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/process/`, data, this.httpOptions);
  }

   putDados(id: number, data: { status: string }) {
    const params = new HttpParams().set('formulario_id', id.toString());
    return this.http.put(`${this.baseUrl}/process/${id}`, data, { params });
  }

  deleteDados(id: number) {
    const params = new HttpParams().set('formulario_id', id.toString());
    return this.http.delete(`${this.baseUrl}/process/${id}`, { params });
  }

}