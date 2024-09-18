import { createAction, props} from "@ngrx/store";

export const create = createAction('[Board] create a board', props<{name: string, columns: any[]}>());
