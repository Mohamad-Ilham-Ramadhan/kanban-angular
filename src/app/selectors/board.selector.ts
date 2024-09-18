import { createSelector } from '@ngrx/store';
import { State } from '../reducers';
import { BoardState } from '../reducers/board.reducer';

export const selectFeature = (state: State) => state.board;

export const selectBoards = createSelector(
  selectFeature,
  (state: BoardState) => state.boards
);