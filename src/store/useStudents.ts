import { create } from "zustand";
import { Student, StudentInput } from "../types/student";
import { readJSON, writeJSON } from "../lib/storage";
import { uuid } from "../lib/uuid";

const KEY = "@students";

type State = {
  students: Student[];
  hydrated: boolean;
  hydrate: () => Promise<void>;
  addStudent: (data: StudentInput) => Promise<void>;
  updateStudent: (id: string, data: StudentInput) => Promise<void>;
  removeStudent: (id: string) => Promise<void>;
};

const SEED: Omit<Student, "id">[] = [
  {
    name: "Aakash P",
    email: "aakash@example.com",
    phone: "9876543210",
    course: "React Native",
    batch: "Jan 2025",
    notes: "Good performer",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    name: "Priya S",
    email: "priya@example.com",
    phone: "9876501234",
    course: "Java",
    batch: "Feb 2025",
    notes: "",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

export const useStudentsStore = create<State>((set, get) => ({
  students: [],
  hydrated: false,

  hydrate: async () => {
    if (get().hydrated) return;
    let saved = await readJSON<Student[]>(KEY, []);
    if (saved.length === 0) {
      saved = SEED.map((s) => ({ ...s, id: uuid() }));
      await writeJSON(KEY, saved);
    }
    set({ students: saved, hydrated: true });
  },

  addStudent: async (data) => {
    const now = Date.now();
    const next: Student = { id: uuid(), createdAt: now, updatedAt: now, ...data };
    const students = [next, ...get().students];
    set({ students });
    await writeJSON(KEY, students);
  },

  updateStudent: async (id, data) => {
    const students = get().students.map((s) =>
      s.id === id ? { ...s, ...data, updatedAt: Date.now() } : s
    );
    set({ students });
    await writeJSON(KEY, students);
  },

  removeStudent: async (id) => {
    const students = get().students.filter((s) => s.id !== id);
    set({ students });
    await writeJSON(KEY, students);
  },
}));

// (No auto-hydration at module load — prevents "window is not defined")
