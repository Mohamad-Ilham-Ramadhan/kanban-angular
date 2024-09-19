import { createSelector } from '@ngrx/store';
import { State } from '../reducers';
import { BoardState } from '../reducers/board.reducer';

export const selectFeature = (state: State) => state.board;

export const selectBoards = createSelector(
  selectFeature,
  (state: BoardState) => state.boards
);

export const selectActiveBoard = createSelector(
  selectFeature,
  (state: BoardState) => state.activeBoard
);

export const selectCurrentBoard = createSelector(
  selectFeature,
  (state: BoardState) => state.boards[state.activeBoard]
);
// export const selectCurrentBoard = createSelector(
//   selectFeature,
//   (state: BoardState) => state.boards[state.activeBoard]
// );