import { createSelector } from '@ngrx/store';
import { Interface } from 'readline';

export interface FeatureState {
   count: number
}

export interface AppState {
  feature: FeatureState;
}

export const selectCount = (state: AppState) => state.feature;

export const selectFeatureCount = createSelector(
  selectCount,
  (state: FeatureState) => state.count
);