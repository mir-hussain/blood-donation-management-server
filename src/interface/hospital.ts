export interface IHospital {
  name: string;
  address: string;
  city: string;
  branch: string;
  contact_number?: string;
  created_by_admin_id?: number | null;
}

export interface IHospitalRequest {
  hospital_id: string;
  blood_type_requested: string;
  quantity_requested: number;
  reason: string;
  status?: string;
  request_date: string;
}
