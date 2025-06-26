// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkerListComponent } from './components/worker/worker-list/worker-list.component';
import { WorkerDetailComponent } from './components/worker/worker-detail/worker-detail.component';
import { WorkerFormComponent } from './components/worker/worker-form/worker-form.component';
import { ChargeListComponent } from './components/charge/charge-list/charge-list.component';
import { ChargeDetailComponent } from './components/charge/charge-detail/charge-detail.component';
import { ChargeFormComponent } from './components/charge/charge-form/charge-form.component';
import { PaymentListComponent } from './components/payment/payment-list/payment-list.component'; // Importar
import { PaymentDetailComponent } from './components/payment/payment-detail/payment-detail.component'; // Importar
import { PaymentFormComponent } from './components/payment/payment-form/payment-form.component'; // Importar


const routes: Routes = [
  { path: '', redirectTo: '/workers', pathMatch: 'full' },
  // Rutas para Trabajadores
  { path: 'workers', component: WorkerListComponent },
  { path: 'workers/new', component: WorkerFormComponent },
  { path: 'workers/edit/:id', component: WorkerFormComponent },
  { path: 'workers/:id', component: WorkerDetailComponent },
  // Rutas para Cargos
  { path: 'charges', component: ChargeListComponent },
  { path: 'charges/new', component: ChargeFormComponent },
  { path: 'charges/edit/:id', component: ChargeFormComponent },
  { path: 'charges/:id', component: ChargeDetailComponent },
  // Rutas para Pagos <-- NUEVAS RUTAS
  { path: 'payments', component: PaymentListComponent },
  { path: 'payments/new', component: PaymentFormComponent },
  { path: 'payments/edit/:id', component: PaymentFormComponent },
  { path: 'payments/:id', component: PaymentDetailComponent },
  // Ruta comodín
  { path: '**', redirectTo: '/workers' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }