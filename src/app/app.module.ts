// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './shared/nav-menu/nav-menu.component';
import { WorkerListComponent } from './components/worker/worker-list/worker-list.component';
import { WorkerDetailComponent } from './components/worker/worker-detail/worker-detail.component';
import { WorkerFormComponent } from './components/worker/worker-form/worker-form.component';
import { ChargeListComponent } from './components/charge/charge-list/charge-list.component';
import { ChargeDetailComponent } from './components/charge/charge-detail/charge-detail.component';
import { ChargeFormComponent } from './components/charge/charge-form/charge-form.component';
// NUEVOS COMPONENTES DE PAGO
import { PaymentListComponent } from './components/payment/payment-list/payment-list.component';
import { PaymentDetailComponent } from './components/payment/payment-detail/payment-detail.component';
import { PaymentFormComponent } from './components/payment/payment-form/payment-form.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    WorkerListComponent,
    WorkerDetailComponent,
    WorkerFormComponent,
    ChargeListComponent,
    ChargeDetailComponent,
    ChargeFormComponent,
    PaymentListComponent, // <-- Declarar nuevo componente
    PaymentDetailComponent, // <-- Declarar nuevo componente
    PaymentFormComponent // <-- Declarar nuevo componente
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }