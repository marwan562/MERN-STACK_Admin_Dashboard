import { createSlice } from "@reduxjs/toolkit";

type TState = {
  mode: "light" | "dark";
  userId:string
};

const initialState: TState = {
  mode: "dark",
  userId:"63701cc1f03239b7f700000e"

};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setThemeAction: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const {setThemeAction} = globalSlice.actions;

export default globalSlice.reducer;
