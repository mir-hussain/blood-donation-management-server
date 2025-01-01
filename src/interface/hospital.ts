export interface IHospital {
  name: string;
  address: string;
  city: string;
  branch: string;
  contact_number?: string;
  created_by_admin_id?: number | null;
}
