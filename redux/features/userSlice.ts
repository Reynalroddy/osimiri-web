import { IUserState } from "@/utils/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IUserState = {
  user: null,
  isAuthenticated: false,
  accesstoken: "",
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.accesstoken = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { setUser, setIsAuthenticated, setToken } = userSlice.actions;
