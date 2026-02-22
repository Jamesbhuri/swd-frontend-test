import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Person {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  birthday: string;
  nationality: string;
  citizenId: string;
  gender: string;
  phone: string;
  phoneCode: string;
  passportNo: string;
  salary: string;
}

interface PersonState {
  persons: Person[];
  editingPerson: Person | null;
}

const loadFromLocalStorage = (): Person[] => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("persons");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (persons: Person[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("persons", JSON.stringify(persons));
};

const initialState: PersonState = {
  persons: [],
  editingPerson: null,
};

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    loadPersons(state) {
      state.persons = loadFromLocalStorage();
    },
    addPerson(state, action: PayloadAction<Omit<Person, "id">>) {
      const newPerson: Person = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.persons.push(newPerson);
      saveToLocalStorage(state.persons);
    },
    updatePerson(state, action: PayloadAction<Person>) {
      const index = state.persons.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.persons[index] = action.payload;
        saveToLocalStorage(state.persons);
      }
      state.editingPerson = null;
    },
    deletePerson(state, action: PayloadAction<string>) {
      state.persons = state.persons.filter((p) => p.id !== action.payload);
      saveToLocalStorage(state.persons);
    },
    deleteMultiple(state, action: PayloadAction<string[]>) {
      state.persons = state.persons.filter(
        (p) => !action.payload.includes(p.id),
      );
      saveToLocalStorage(state.persons);
    },
    setEditingPerson(state, action: PayloadAction<Person | null>) {
      state.editingPerson = action.payload;
    },
  },
});

export const {
  loadPersons,
  addPerson,
  updatePerson,
  deletePerson,
  deleteMultiple,
  setEditingPerson,
} = personSlice.actions;

export default personSlice.reducer;
