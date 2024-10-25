import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import { themeReducer } from './theme.reducer';
import { boardReducer } from './board.reducer';

export interface State {
  theme: string;
  board: any;
}

export const reducers: ActionReducerMap<State> = {
  theme: themeReducer,
  board: boardReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
