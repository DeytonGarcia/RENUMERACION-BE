// src/app/components/payment/payment-form/payment-form.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../../services/payment.service';
import { Payment } from '../../../models/payment.model';
import { Location } from '@angular/common';
import { WorkerService } from '../../../services/worker.service'; // Importar WorkerService
import { Worker } from '../../../models/worker.model'; // Importar Worker Model

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  payment: Payment = {
    workerId: '',
    paymentDate: '',
    amount: 0,
    paymentType: '',
    description: '',
    periodStart: '',
    periodEnd: '',
    status: '',
    active: true // Por defecto, al crear es activo
  };
  isEditMode = false;
  paymentId: string | null = null;
  activeWorkers: Worker[] = []; // Para el select de obreros

  constructor(
    private paymentService: PaymentService,
    private workerService: WorkerService, // Inyectar WorkerService
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.loadActiveWorkers(); // Cargar obreros al iniciar el formulario

    this.paymentId = this.route.snapshot.paramMap.get('id');
    if (this.paymentId) {
      this.isEditMode = true;
      this.paymentService.getPaymentById(this.paymentId).subscribe({
        next: (data) => {
          this.payment = data;
          // Formatear fechas para los inputs type="date"
          this.payment.paymentDate = data.paymentDate ? new Date(data.paymentDate).toISOString().split('T')[0] : '';
          this.payment.periodStart = data.periodStart ? new Date(data.periodStart).toISOString().split('T')[0] : '';
          this.payment.periodEnd = data.periodEnd ? new Date(data.periodEnd).toISOString().split('T')[0] : '';
        },
        error: (err) => {
          console.error('Error al cargar pago para edición:', err);
          alert('No se pudo cargar el pago para editar.');
          this.router.navigate(['/payments']);
        }
      });
    }
  }

  loadActiveWorkers(): void {
    this.workerService.getAllWorkers().subscribe({ // Asumiendo que getAllWorkers trae activos e inactivos, o crea un endpoint para solo activos
      next: (data) => {
        this.activeWorkers = data.filter(w => w.active); // Filtrar solo los activos
        if (!this.isEditMode && this.activeWorkers.length > 0) {
          // Si es un nuevo pago y hay obreros, seleccionar el primero por defecto (opcional)
          // this.payment.workerId = this.activeWorkers[0].id!;
        }
      },
      error: (err) => {
        console.error('Error al cargar obreros activos:', err);
        alert('No se pudieron cargar los obreros activos para seleccionar.');
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.paymentService.updatePayment(this.paymentId!, this.payment).subscribe({
        next: () => {
          alert('Pago actualizado exitosamente!');
          this.router.navigate(['/payments']);
        },
        error: (err) => {
          console.error('Error al actualizar pago:', err);
          alert('Hubo un error al actualizar el pago.');
        }
      });
    } else {
      this.paymentService.createPayment(this.payment).subscribe({
        next: () => {
          alert('Pago creado exitosamente!');
          this.router.navigate(['/payments']);
        },
        error: (err) => {
          console.error('Error al crear pago:', err);
          alert('Hubo un error al crear el pago.');
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}