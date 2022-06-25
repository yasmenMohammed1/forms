export interface IUser {
  fullName: string;
  userName: string;
  password: string;
  age?: number;
  lastname?: string;
  firstname?: string;
  address?: {
    countryOfBirth: string | null;
    address: string | null;
  };
}
