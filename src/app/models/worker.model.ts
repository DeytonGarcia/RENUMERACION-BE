export interface Worker {
  id?: string;
  firstName: string;
  lastName: string;
  dni: string;
  address: string;
  phone: string;
  email: string;
  hireDate: string; // Usamos string para las fechas y convertimos si es necesario
  birthDate: string;
  position: string;
  status: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}