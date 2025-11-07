import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userState {
  userName: string;
  email: string;
  isLoggedIn: boolean;
}

const initialState: userState = {
  userName: "",
  email: "",
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ userName: string; email: string }>
    ) => {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.userName = "";
      state.email = "";
      state.isLoggedIn = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
