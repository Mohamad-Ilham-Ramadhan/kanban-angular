import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { initialState, counterReducer } from './counter.reducer';
import { Book } from '../book-list/books.model';
import { booksReducer } from '../state/books.reducer';
import { collectionReducer } from '../state/collection.reducer';
import { themeReducer } from './theme.reducer';
import { boardReducer } from './board.reducer';

export interface State {
  count: number;
  books: ReadonlyArray<Book>;
  collection: ReadonlyArray<string>;
  theme: string;
  board: any;
}

export const reducers: ActionReducerMap<State> = {
  count: counterReducer,
  books: booksReducer,
  collection: collectionReducer,
  theme: themeReducer,
  board: boardReducer
};

export function cobaReducer(reducer: ActionReducer<any>) : ActionReducer<any> {
  return function(state, action) {
    if (typeof window === 'undefined') {
      console.log('no window')
    } else {
      console.log('there is a window there is a door', state);
      localStorage.setItem('coba', 'coba coba aja');
    }
    return reducer(state, action);
  }
}

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [cobaReducer] : [cobaReducer];
