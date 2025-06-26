// src/app/components/payment/payment-detail/payment-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../../services/payment.service';
import { Payment } from '../../../models/payment.model';
import { Location } from '@angular/common';
import { WorkerService } from '../../../services/worker.service'; // Importar WorkerService
import { Worker } from '../../../models/worker.model'; // Importar Worker Model

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {
  payment: Payment | undefined;
  workerFullName: string = 'Cargando...'; // Para mostrar el nombre del obrero

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private workerService: WorkerService, // Inyectar WorkerService
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.paymentService.getPaymentById(id).subscribe({
          next: (data) => {
            this.payment = data;
            // Una vez que tenemos el pago, obtenemos el nombre del obrero
            if (this.payment.workerId) {
              this.workerService.getWorkerById(this.payment.workerId).subscribe({
                next: (workerData) => {
                  this.workerFullName = `${workerData.firstName} ${workerData.lastName}`;
                },
                error: (workerErr) => {
                  console.error('Error al cargar obrero para el pago:', workerErr);
                  this.workerFullName = 'Obrero no encontrado';
                }
              });
            } else {
              this.workerFullName = 'N/A';
            }
          },
          error: (err) => {
            console.error('Error al obtener detalles del pago:', err);
            alert('No se pudo cargar los detalles del pago.');
            this.router.navigate(['/payments']);
          }
        });
      }
    });
  }

  editPayment(id: string): void {
    this.router.navigate(['/payments/edit', id]);
  }

  goBack(): void {
    this.location.back();
  }
}