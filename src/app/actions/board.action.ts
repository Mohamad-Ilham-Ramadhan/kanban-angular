import { createAction, props} from "@ngrx/store";

export const getStateFromLocalStorage = createAction('[Board] get state from localStorage');
export const create = createAction('[Board] create a board', props<{name: string, columns: any[]}>());
export const setActiveBoard = createAction('[Board] set active board', props<{index: number}>());
