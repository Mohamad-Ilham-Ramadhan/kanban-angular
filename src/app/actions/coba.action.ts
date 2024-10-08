import { createAction, props} from "@ngrx/store";

export const swapTask = createAction('[Coba] swap task', props<{fromIndex: number, toIndex: number}>());
