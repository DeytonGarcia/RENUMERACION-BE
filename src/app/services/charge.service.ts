import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Charge } from '../models/charge.model';

@Injectable({
  providedIn: 'root'
})
export class ChargeService {
  private apiUrl = 'http://localhost:8080/api/charges'; // Asegúrate de que coincida con tu backend

  constructor(private http: HttpClient) { }

  getAllCharges(): Observable<Charge[]> {
    return this.http.get<Charge[]>(this.apiUrl);
  }

  getChargeById(id: string): Observable<Charge> {
    return this.http.get<Charge>(`${this.apiUrl}/${id}`);
  }

  createCharge(charge: Charge): Observable<Charge> {
    return this.http.post<Charge>(this.apiUrl, charge);
  }

  updateCharge(id: string, charge: Charge): Observable<Charge> {
    return this.http.put<Charge>(`${this.apiUrl}/${id}`, charge);
  }

  softDeleteCharge(id: string): Observable<Charge> {
    return this.http.patch<Charge>(`${this.apiUrl}/${id}/soft-delete`, {});
  }

  restoreCharge(id: string): Observable<Charge> {
    return this.http.patch<Charge>(`${this.apiUrl}/${id}/restore`, {});
  }
}