import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: {
    email: string;
    password: string;
  } | null;
}

const getStoredAuthData = () => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  return {
    isAuthenticated: !!token,
    token: token,
    user:
      email && password
        ? {
            email: email,
            password: password,
          }
        : null,
  };
};

const initialState: AuthState = {
  ...getStoredAuthData(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ email: string; token: string; password: string }>
    ) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = {
        email: action.payload.email,
        password: action.payload.password,
      };
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("password", action.payload.password);
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
