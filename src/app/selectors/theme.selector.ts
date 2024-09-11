import { createSelector } from '@ngrx/store';
export interface AppState {
  theme: string;
}

export const selectTheme = (state: AppState) => state.theme;

export const selectFeatureTheme = createSelector(
  selectTheme,
  (state) => state
);