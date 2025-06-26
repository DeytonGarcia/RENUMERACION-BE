export interface Charge {
  id?: string;
  name: string;
  description: string;
  baseSalaryMin: number;
  baseSalaryMax: number;
  responsibilities: string[];
  requiredSkills: string[];
  benefits: string[];
  active: boolean;
}