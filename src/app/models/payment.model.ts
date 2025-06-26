// src/app/models/payment.model.ts
export interface Payment {
  id?: string;
  workerId: string;
  paymentDate: string; // Usamos string para el input type="date"
  amount: number;
  paymentType: string;
  description: string;
  periodStart: string; // Usamos string para el input type="date"
  periodEnd: string;   // Usamos string para el input type="date"
  status: string;
  active: boolean;
}