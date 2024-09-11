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

export interface State {
  count: number;
  books: ReadonlyArray<Book>;
  collection: ReadonlyArray<string>;
  theme: string;
}

export const reducers: ActionReducerMap<State> = {
  count: counterReducer,
  books: booksReducer,
  collection: collectionReducer,
  theme: themeReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
