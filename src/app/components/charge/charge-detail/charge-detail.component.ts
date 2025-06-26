import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChargeService } from '../../../services/charge.service';
import { Charge } from '../../../models/charge.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-charge-detail',
  templateUrl: './charge-detail.component.html',
  styleUrls: ['./charge-detail.component.css']
})
export class ChargeDetailComponent implements OnInit {
  charge: Charge | undefined;

  constructor(
    private route: ActivatedRoute,
    private chargeService: ChargeService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.chargeService.getChargeById(id).subscribe({
          next: (data) => {
            this.charge = data;
          },
          error: (err) => {
            console.error('Error al obtener detalles del cargo:', err);
            this.router.navigate(['/charges']);
          }
        });
      }
    });
  }

  editCharge(id: string): void {
    this.router.navigate(['/charges/edit', id]);
  }

  goBack(): void {
    this.location.back();
  }
}