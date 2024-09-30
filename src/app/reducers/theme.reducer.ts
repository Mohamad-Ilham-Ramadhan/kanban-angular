import { createReducer, on } from "@ngrx/store";
import { toggleTheme } from "../actions/theme.action";

export const initialState : string = 'dark';

export const themeReducer = createReducer(
   initialState,
   on(toggleTheme, (state) => {
      let newState = state === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', JSON.stringify(newState))
      return newState;
   }),
)