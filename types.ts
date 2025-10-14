// src/types.ts
export interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  modules: number;
  duration: string;
  progress: number;
  color: string;
  modulesList?: Module[];
}
