import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../../../services/worker.service';
import { Worker } from '../../../models/worker.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.css']
})
export class WorkerListComponent implements OnInit {
  workers: Worker[] = [];
  activeWorkers: Worker[] = [];
  inactiveWorkers: Worker[] = [];
  mostrarInactivos: boolean = false;

  constructor(private workerService: WorkerService, private router: Router) {}

  ngOnInit(): void {
    this.loadWorkers();
  }

  toggleInactivos(): void {
    this.mostrarInactivos = !this.mostrarInactivos;
    Swal.fire({
      icon: 'info',
      title: this.mostrarInactivos ? 'Mostrando trabajadores inactivos' : 'Ocultando trabajadores inactivos',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500
    });
  }

  loadWorkers(): void {
    this.workerService.getAllWorkers().subscribe({
      next: (data) => {
        this.workers = data;
        this.activeWorkers = this.workers.filter(w => w.active);
        this.inactiveWorkers = this.workers.filter(w => !w.active);
        Swal.fire({
          icon: 'success',
          title: 'Trabajadores cargados',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000
        });
      },
      error: (err) => {
        console.error('Error al cargar trabajadores:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la lista de trabajadores.',
          confirmButtonColor: '#d33'
        });
      }
    });
  }

  viewWorkerDetails(id: string): void {
    Swal.fire({
      icon: 'info',
      title: 'Redirigiendo...',
      showConfirmButton: false,
      timer: 1000,
      didOpen: () => {
        Swal.showLoading();
        setTimeout(() => this.router.navigate(['/workers', id]), 500);
      }
    });
  }

  editWorker(id: string): void {
    Swal.fire({
      icon: 'warning',
      title: 'Editando...',
      showConfirmButton: false,
      timer: 1000,
      didOpen: () => {
        Swal.showLoading();
        setTimeout(() => this.router.navigate(['/workers/edit', id]), 500);
      }
    });
  }

  softDeleteWorker(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este trabajador será desactivado (pasará a inactivos).',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.workerService.softDeleteWorker(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Desactivado',
              text: 'El trabajador ha sido desactivado correctamente.',
              confirmButtonColor: '#28a745'
            });
            this.loadWorkers();
          },
          error: (err) => {
            console.error('Error al desactivar trabajador:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo desactivar el trabajador.',
              confirmButtonColor: '#d33'
            });
          }
        });
      }
    });
  }

  restoreWorker(id: string): void {
    Swal.fire({
      title: '¿Restaurar trabajador?',
      text: 'Este trabajador volverá a estar activo.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, restaurar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        this.workerService.restoreWorker(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Restaurado',
              text: 'El trabajador ha sido restaurado correctamente.',
              confirmButtonColor: '#3085d6'
            });
            this.loadWorkers();
          },
          error: (err) => {
            console.error('Error al restaurar trabajador:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo restaurar el trabajador.',
              confirmButtonColor: '#d33'
            });
          }
        });
      }
    });
  }
}
