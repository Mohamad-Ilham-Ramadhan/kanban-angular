import { createAction, props} from "@ngrx/store";
import { Column } from "../reducers/board.reducer";

export const getStateFromLocalStorage = createAction('[Board] get state from localStorage');
export const createNewBoard = createAction('[Board] create a board', props<{name: string, columns: any[]}>());
export const setActiveBoard = createAction('[Board] set active board', props<{index: number}>());
export const deleteBoard = createAction('[Board] delete a board');
export const newColumn = createAction('[Board] new column', props<{columnNames: string[], ids: Set<string>}>());
export const editBoard = createAction('[Board] edit board', props<{boardName: string, columnNames: string[], ids: Set<string>}>());
export const addTask = createAction('[Board] add task', props<{title: string, description: string, subtasks: any[], status: string}>());
export const moveColumn = createAction('[Board] move column', props<{prevIndex: number, newIndex: number, taskIndex: number}>());
export const toggleSubtask = createAction('[Board] toggle subtask', props<{columnIndex: string, taskIndex: string, subtaskIndex: string}>());
export const deleteTask = createAction('[Board] delete task', props<{columnIndex: string, taskIndex: string}>());
export const editTask = createAction('[Board] edit task', props<{title: string, description: string, subtasks: any[], status: string, columnIndex: string, taskIndex: string}>());
export const getTask = createAction('[Board] get task', props<{columnIndex: number, taskIndex: number}>());
export const swapTask = createAction('[Board] swap task', props<{fromColumnIndex: number, toColumnIndex: number, fromIndex: number, toIndex: number}>());
