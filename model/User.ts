export interface User
{
  id: number;
  firstName: string;
  lastName: string;
  role: string;

  email: string;
  driverLicenseNumber: string;
  passportNumber: string;
  idCardNumber: string;
  isBlocked: boolean;
  phoneNumber: string;

}