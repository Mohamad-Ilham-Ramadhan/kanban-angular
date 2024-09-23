import { createAction, props} from "@ngrx/store";
import { Column } from "../reducers/board.reducer";

export const getStateFromLocalStorage = createAction('[Board] get state from localStorage');
export const create = createAction('[Board] create a board', props<{name: string, columns: any[]}>());
export const setActiveBoard = createAction('[Board] set active board', props<{index: number}>());
export const deleteBoard = createAction('[Board] delete a board');
export const newColumn = createAction('[Board] new column', props<{columnNames: string[], ids: Set<string>}>());