export type Student = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  course: string;
  batch: string;
  notes?: string;
  createdAt: number;
  updatedAt: number;
};

export type StudentInput = {
  name: string;
  email: string;
  phone?: string;
  course: string;
  batch: string;
  notes?: string;
};
