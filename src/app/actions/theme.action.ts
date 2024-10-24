import { createAction, props } from "@ngrx/store";

export const toggleTheme = createAction('[Color Theme] Toggle');
export const setTheme = createAction('[Color Theme] Set', props<{theme: 'light' | 'dark'}>());
