import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChargeService } from '../../../services/charge.service';
import { Charge } from '../../../models/charge.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-charge-form',
  templateUrl: './charge-form.component.html',
  styleUrls: ['./charge-form.component.css']
})
export class ChargeFormComponent implements OnInit {
  charge: Charge = {
    name: '',
    description: '',
    baseSalaryMin: 0,
    baseSalaryMax: 0,
    responsibilities: [],
    requiredSkills: [],
    benefits: [],
    active: true
  };
  isEditMode = false;
  chargeId: string | null = null;

  responsibilitiesInput: string = '';
  requiredSkillsInput: string = '';
  benefitsInput: string = '';

  constructor(
    private chargeService: ChargeService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.chargeId = this.route.snapshot.paramMap.get('id');
    if (this.chargeId) {
      this.isEditMode = true;
      this.chargeService.getChargeById(this.chargeId).subscribe({
        next: (data) => {
          this.charge = data;
          this.responsibilitiesInput = data.responsibilities ? data.responsibilities.join(', ') : '';
          this.requiredSkillsInput = data.requiredSkills ? data.requiredSkills.join(', ') : '';
          this.benefitsInput = data.benefits ? data.benefits.join(', ') : '';
        },
        error: (err) => {
          console.error('Error al cargar cargo para edición:', err);
          alert('No se pudo cargar el cargo para editar.');
          this.router.navigate(['/charges']);
        }
      });
    }
  }

  updateResponsibilities(): void {
    this.charge.responsibilities = this.responsibilitiesInput.split(',').map(item => item.trim()).filter(item => item !== '');
  }

  updateRequiredSkills(): void {
    this.charge.requiredSkills = this.requiredSkillsInput.split(',').map(item => item.trim()).filter(item => item !== '');
  }

  updateBenefits(): void {
    this.charge.benefits = this.benefitsInput.split(',').map(item => item.trim()).filter(item => item !== '');
  }

  onSubmit(): void {
    // Asegurarse de que los arrays estén actualizados antes de enviar
    this.updateResponsibilities();
    this.updateRequiredSkills();
    this.updateBenefits();

    if (this.isEditMode) {
      this.chargeService.updateCharge(this.chargeId!, this.charge).subscribe({
        next: () => {
          alert('Cargo actualizado exitosamente!');
          this.router.navigate(['/charges']);
        },
        error: (err) => {
          console.error('Error al actualizar cargo:', err);
          alert('Hubo un error al actualizar el cargo.');
        }
      });
    } else {
      this.chargeService.createCharge(this.charge).subscribe({
        next: () => {
          alert('Cargo creado exitosamente!');
          this.router.navigate(['/charges']);
        },
        error: (err) => {
          console.error('Error al crear cargo:', err);
          alert('Hubo un error al crear el cargo.');
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}