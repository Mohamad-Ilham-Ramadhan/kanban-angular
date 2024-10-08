import { createReducer, on } from "@ngrx/store";
import { v4 as uuid} from 'uuid';
import { swapTask } from "../actions/coba.action";

export type Task = {
   id: string,
   name: string,
   class: string;
}
const initialState: Task[] = [
   {id: uuid(), name: '1', class: 'archer'},
   {id: uuid(), name: '2', class: 'Mage'},
   {id: uuid(), name: '3', class: 'Philosopher'},
   {id: uuid(), name: '4', class: 'Meherune'},
   {id: uuid(), name: '5', class: 'Meherune'},
]

export const cobaReducer = createReducer(
   initialState, 
   on(swapTask, (state, {fromIndex, toIndex}) => {
      let newState = JSON.parse(JSON.stringify(state));
      if (fromIndex === toIndex) return state;

      if (fromIndex < toIndex) {
         // swap bawah
         newState = newState.map( (t: Task, index: number) => {
            if (index >= fromIndex && index < toIndex) return state[index + 1]
            else if (index === toIndex) return state[fromIndex];
            return t;
         });
      } else {
         // swap atas
         newState = newState.map( (t: Task, index: number) => { 
            if (index < toIndex) return t;
            else if (index === toIndex) return newState[fromIndex];
            return newState[index - 1];
         })
      }
      console.log('newState', newState);
      return newState;
   })
)