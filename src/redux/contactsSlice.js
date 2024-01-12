import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = { contacts: [] };

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    addContactAction: {
      prepare: ({ name, number }) => {
        const newContact = {
          id: nanoid(),
          name,
          number,
        };
        return { payload: newContact };
      },
      reducer: (state, { payload }) => {
        state.contacts.push(payload);
      },
    },
    deleteContactAction: (state, { payload }) => {
      state.contacts = state.contacts.filter(contact => contact.id !== payload);
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { addContactAction, deleteContactAction } = contactsSlice.actions;
