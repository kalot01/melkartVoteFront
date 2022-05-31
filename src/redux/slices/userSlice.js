import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    role: "b",
    votant: 0,
    voteCourant: 0,
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setVotant: (state, action) => {
      state.votant = action.payload;
    },
    setVoteCourant: (state, action) => {
      state.voteCourant = action.payload;
    },
  },
});

export const { setRole, setVotant, setVoteCourant } = userSlice.actions;
export const selectRole = (state) => state.user.role;
export const selectVotant = (state) => state.user.votant;
export const selectVoteCourant = (state) => state.user.voteCourant;
export default userSlice.reducer;
