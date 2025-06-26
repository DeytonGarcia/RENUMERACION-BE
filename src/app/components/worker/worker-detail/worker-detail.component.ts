import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkerService } from '../../../services/worker.service';
import { Worker } from '../../../models/worker.model';
import { Location } from '@angular/common'; // Importar Location

@Component({
  selector: 'app-worker-detail',
  templateUrl: './worker-detail.component.html',
  styleUrls: ['./worker-detail.component.css']
})
export class WorkerDetailComponent implements OnInit {
  worker: Worker | undefined;

  constructor(
    private route: ActivatedRoute,
    private workerService: WorkerService,
    private router: Router,
    private location: Location // Inyectar Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.workerService.getWorkerById(id).subscribe({
          next: (data) => {
            this.worker = data;
          },
          error: (err) => {
            console.error('Error al obtener detalles del trabajador:', err);
            // Redirigir o mostrar mensaje de error
            this.router.navigate(['/workers']);
          }
        });
      }
    });
  }

  editWorker(id: string): void {
    this.router.navigate(['/workers/edit', id]);
  }

  goBack(): void {
    this.location.back(); // Vuelve a la página anterior
  }
}