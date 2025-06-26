import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkerService } from '../../../services/worker.service';
import { Worker } from '../../../models/worker.model';
import { Location } from '@angular/common'; // Importar Location

@Component({
  selector: 'app-worker-form',
  templateUrl: './worker-form.component.html',
  styleUrls: ['./worker-form.component.css']
})
export class WorkerFormComponent implements OnInit {
  worker: Worker = {
    firstName: '',
    lastName: '',
    dni: '',
    address: '',
    phone: '',
    email: '',
    hireDate: '',
    birthDate: '',
    position: '',
    status: '',
    active: true // Por defecto, al crear es activo
  };
  isEditMode = false;
  workerId: string | null = null;

  constructor(
    private workerService: WorkerService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location // Inyectar Location
  ) { }

  ngOnInit(): void {
    this.workerId = this.route.snapshot.paramMap.get('id');
    if (this.workerId) {
      this.isEditMode = true;
      this.workerService.getWorkerById(this.workerId).subscribe({
        next: (data) => {
          this.worker = data;
          // Formatear fechas para los inputs type="date"
          this.worker.hireDate = data.hireDate ? new Date(data.hireDate).toISOString().split('T')[0] : '';
          this.worker.birthDate = data.birthDate ? new Date(data.birthDate).toISOString().split('T')[0] : '';
        },
        error: (err) => {
          console.error('Error al cargar trabajador para edición:', err);
          alert('No se pudo cargar el trabajador para editar.');
          this.router.navigate(['/workers']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.workerService.updateWorker(this.workerId!, this.worker).subscribe({
        next: () => {
          alert('Trabajador actualizado exitosamente!');
          this.router.navigate(['/workers']);
        },
        error: (err) => {
          console.error('Error al actualizar trabajador:', err);
          alert('Hubo un error al actualizar el trabajador.');
        }
      });
    } else {
      this.workerService.createWorker(this.worker).subscribe({
        next: () => {
          alert('Trabajador creado exitosamente!');
          this.router.navigate(['/workers']);
        },
        error: (err) => {
          console.error('Error al crear trabajador:', err);
          alert('Hubo un error al crear el trabajador.');
        }
      });
    }
  }

  goBack(): void {
    this.location.back(); // Vuelve a la página anterior
  }
}