import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../services/payment.service';
import { Payment } from '../../../models/payment.model';
import { Router } from '@angular/router';
import { WorkerService } from '../../../services/worker.service';
import { Worker } from '../../../models/worker.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  payments: Payment[] = [];
  activePayments: Payment[] = [];
  inactivePayments: Payment[] = [];
  workers: Worker[] = [];
  mostrarInactivos: boolean = false;

  constructor(
    private paymentService: PaymentService,
    private workerService: WorkerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadWorkers();
  }

  toggleInactivos(): void {
    this.mostrarInactivos = !this.mostrarInactivos;
  }

  loadWorkers(): void {
    this.workerService.getAllWorkers().subscribe({
      next: (data) => {
        this.workers = data;
        this.loadPayments();
      },
      error: (err) => {
        console.error('Error al cargar obreros:', err);
        this.loadPayments();
      }
    });
  }

  loadPayments(): void {
    this.paymentService.getAllPayments().subscribe({
      next: (data) => {
        this.payments = data;
        this.activePayments = data.filter(p => p.active);
        this.inactivePayments = data.filter(p => !p.active);
        Swal.fire({
          icon: 'success',
          title: 'Pagos cargados correctamente',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000
        });
      },
      error: (err) => {
        console.error('Error al cargar pagos:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los pagos.',
          confirmButtonColor: '#d33'
        });
      }
    });
  }

  getWorkerFullName(workerId: string): string {
    const worker = this.workers.find(w => w.id === workerId);
    return worker ? `${worker.firstName} ${worker.lastName}` : 'Obrero Desconocido';
  }

  viewPaymentDetails(id: string): void {
    Swal.fire({
      icon: 'info',
      title: 'Redirigiendo...',
      showConfirmButton: false,
      timer: 1000,
      didOpen: () => {
        Swal.showLoading();
        setTimeout(() => this.router.navigate(['/payments', id]), 500);
      }
    });
  }

  editPayment(id: string): void {
    Swal.fire({
      icon: 'warning',
      title: 'Editando pago...',
      showConfirmButton: false,
      timer: 1000,
      didOpen: () => {
        Swal.showLoading();
        setTimeout(() => this.router.navigate(['/payments/edit', id]), 500);
      }
    });
  }

  softDeletePayment(id: string): void {
    Swal.fire({
      title: '¿Desactivar este pago?',
      text: 'Este pago será movido a la lista de inactivos.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.paymentService.softDeletePayment(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Pago desactivado',
              text: 'El pago se movió correctamente a inactivos.',
              confirmButtonColor: '#28a745'
            });
            this.loadPayments();
          },
          error: (err) => {
            console.error('Error al desactivar pago:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo desactivar el pago.',
              confirmButtonColor: '#d33'
            });
          }
        });
      }
    });
  }

  restorePayment(id: string): void {
    Swal.fire({
      title: '¿Restaurar este pago?',
      text: 'Este pago volverá a estar activo.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, restaurar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        this.paymentService.restorePayment(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Pago restaurado',
              text: 'El pago ha sido restaurado correctamente.',
              confirmButtonColor: '#3085d6'
            });
            this.loadPayments();
          },
          error: (err) => {
            console.error('Error al restaurar pago:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo restaurar el pago.',
              confirmButtonColor: '#d33'
            });
          }
        });
      }
    });
  }
}
