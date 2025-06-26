import { Component, OnInit } from '@angular/core';
import { ChargeService } from '../../../services/charge.service';
import { Charge } from '../../../models/charge.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-charge-list',
  templateUrl: './charge-list.component.html',
  styleUrls: ['./charge-list.component.css']
})
export class ChargeListComponent implements OnInit {
  charges: Charge[] = [];
  activeCharges: Charge[] = [];
  inactiveCharges: Charge[] = [];
  mostrarInactivos: boolean = false;

  constructor(private chargeService: ChargeService, private router: Router) {}

  ngOnInit(): void {
    this.loadCharges();
  }

  toggleInactivos(): void {
    this.mostrarInactivos = !this.mostrarInactivos;

    Swal.fire({
      icon: 'info',
      title: this.mostrarInactivos ? 'Mostrando cargos inactivos' : 'Ocultando cargos inactivos',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500
    });
  }

  loadCharges(): void {
    this.chargeService.getAllCharges().subscribe({
      next: (data) => {
        this.charges = data;
        this.activeCharges = this.charges.filter(c => c.active);
        this.inactiveCharges = this.charges.filter(c => !c.active);
        Swal.fire({
          icon: 'success',
          title: 'Cargos cargados',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000
        });
      },
      error: (err) => {
        console.error('Error al cargar cargos:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los cargos.',
          confirmButtonColor: '#d33'
        });
      }
    });
  }

  viewChargeDetails(id: string): void {
    Swal.fire({
      icon: 'info',
      title: 'Redirigiendo...',
      showConfirmButton: false,
      timer: 1000,
      didOpen: () => {
        Swal.showLoading();
        setTimeout(() => this.router.navigate(['/charges', id]), 500);
      }
    });
  }

  editCharge(id: string): void {
    Swal.fire({
      icon: 'warning',
      title: 'Editando...',
      showConfirmButton: false,
      timer: 1000,
      didOpen: () => {
        Swal.showLoading();
        setTimeout(() => this.router.navigate(['/charges/edit', id]), 500);
      }
    });
  }

  softDeleteCharge(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este cargo será desactivado (pasará a inactivos).',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.chargeService.softDeleteCharge(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Desactivado',
              text: 'El cargo ha sido desactivado correctamente.',
              confirmButtonColor: '#28a745'
            });
            this.loadCharges();
          },
          error: (err) => {
            console.error('Error al desactivar cargo:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo desactivar el cargo.',
              confirmButtonColor: '#d33'
            });
          }
        });
      }
    });
  }

  restoreCharge(id: string): void {
    Swal.fire({
      title: '¿Restaurar cargo?',
      text: 'Este cargo volverá a estar activo.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, restaurar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        this.chargeService.restoreCharge(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Restaurado',
              text: 'El cargo ha sido restaurado correctamente.',
              confirmButtonColor: '#3085d6'
            });
            this.loadCharges();
          },
          error: (err) => {
            console.error('Error al restaurar cargo:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo restaurar el cargo.',
              confirmButtonColor: '#d33'
            });
          }
        });
      }
    });
  }
}
