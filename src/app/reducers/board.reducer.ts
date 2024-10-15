import { createReducer, on } from "@ngrx/store";
import { v4 as uuid } from 'uuid';
import { create, deleteBoard, editBoard, getStateFromLocalStorage, newColumn, setActiveBoard, addTask, moveColumn, toggleSubtask, deleteTask, editTask, swapTask} from "../actions/board.action";

export interface Subtask  {
   id: string;
   title: string;
   isDone: boolean;
}
export interface Task {
   id: string;
   title: string;
   description: string;
   subtasks: Subtask[];
}
export interface Column {
   id: string;
   name: string;
   tasks: Task[];
}
export interface Board {
   id: string;
   name: string;
   columns: Column[]
}
export interface BoardState {
   activeBoard: number;
   boards: Board[]
}
const defaultState = {
   activeBoard: 0,
   boards: [
      {
         id: uuid(),
         name: 'Platform Launch',
         columns: [
            {
               id: uuid(),
               name: 'Todo',
               tasks: [
                  {
                     id: uuid(),
                     title: 'Design onboarding flow',
                     description: '',
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Sign up page',
                           isDone: true,
                        },
                        {
                           id: uuid(),
                           title: 'Sign in page',
                           isDone: false,
                        },
                        {
                           id: uuid(),
                           title: 'Welcome page',
                           isDone: false,
                        },
                     ],
                  },
                  {
                     id: uuid(),
                     title: 'Research pricing points of various competitors and trial different business models',
                     description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Research competitor pricing and business models',
                           isDone: true,
                        },
                        {
                           id: uuid(),
                           title: 'Outline a business model that works for our solution',
                           isDone: false,
                        },
                        {
                           id: uuid(),
                           title: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                           isDone: false,
                        },
                     ],
                  },
                  {
                     id: uuid(),
                     title: 'Research pricing points of various competitors and trial different business models',
                     description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Research competitor pricing and business models',
                           isDone: true,
                        },
                        {
                           id: uuid(),
                           title: 'Outline a business model that works for our solution',
                           isDone: false,
                        },
                        {
                           id: uuid(),
                           title: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                           isDone: false,
                        },
                     ],
                  },
                  {
                     id: uuid(),
                     title: 'Research pricing points of various competitors and trial different business models',
                     description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Research competitor pricing and business models',
                           isDone: true,
                        },
                        {
                           id: uuid(),
                           title: 'Outline a business model that works for our solution',
                           isDone: false,
                        },
                        {
                           id: uuid(),
                           title: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                           isDone: false,
                        },
                     ],
                  },
                  {
                     id: uuid(),
                     title: 'Research pricing points of various competitors and trial different business models',
                     description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Research competitor pricing and business models',
                           isDone: true,
                        },
                        {
                           id: uuid(),
                           title: 'Outline a business model that works for our solution',
                           isDone: false,
                        },
                        {
                           id: uuid(),
                           title: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                           isDone: false,
                        },
                     ],
                  },
               ],
            },
            {
               id: uuid(),
               name: 'Todo',
               tasks: [
                  {
                     id: uuid(),
                     title: 'Design onboarding flow',
                     description: '',
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Sign up page',
                           isDone: true,
                        },
                        {
                           id: uuid(),
                           title: 'Sign in page',
                           isDone: true,
                        },
                        {
                           id: uuid(),
                           title: 'Welcome page',
                           isDone: true,
                        },
                     ],
                  },
                  {
                     id: uuid(),
                     title: 'Research pricing points of various competitors and trial different business models',
                     description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Research competitor pricing and business models',
                           isDone: true,
                        },
                        {
                           id: uuid(),
                           title: 'Outline a business model that works for our solution',
                           isDone: false,
                        },
                        {
                           id: uuid(),
                           title: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                           isDone: false,
                        },
                     ],
                  },
               ],
            },
            {
               id: uuid(),
               name: 'Todo',
               tasks: [
                  {
                     id: uuid(),
                     title: 'Design onboarding flow',
                     description: '',
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Sign up page',
                           isDone: true,
                        },
                        {
                           id: uuid(),
                           title: 'Sign in page',
                           isDone: false,
                        },
                        {
                           id: uuid(),
                           title: 'Welcome page',
                           isDone: false,
                        },
                     ],
                  },
                  {
                     id: uuid(),
                     title: 'Research pricing points of various competitors and trial different business models',
                     description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Research competitor pricing and business models',
                           isDone: true,
                        },
                        {
                           id: uuid(),
                           title: 'Outline a business model that works for our solution',
                           isDone: false,
                        },
                        {
                           id: uuid(),
                           title: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                           isDone: false,
                        },
                     ],
                  },
               ],
            },
            {
               id: uuid(),
               name: 'Todo',
               tasks: [
                  {
                     id: uuid(),
                     title: 'Design onboarding flow',
                     description: '',
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Sign up page',
                           isDone: true,
                        },
                        {
                           id: uuid(),
                           title: 'Sign in page',
                           isDone: false,
                        },
                        {
                           id: uuid(),
                           title: 'Welcome page',
                           isDone: false,
                        },
                     ],
                  },
                  {
                     id: uuid(),
                     title: 'Research pricing points of various competitors and trial different business models',
                     description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Research competitor pricing and business models',
                           isDone: true,
                        },
                        {
                           id: uuid(),
                           title: 'Outline a business model that works for our solution',
                           isDone: false,
                        },
                        {
                           id: uuid(),
                           title: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                           isDone: false,
                        },
                     ],
                  },
               ],
            },
            {
               id: uuid(),
               name: 'Todo',
               tasks: [
                  {
                     id: uuid(),
                     title: 'Design onboarding flow',
                     description: '',
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Sign up page',
                           isDone: true,
                        },
                        {
                           id: uuid(),
                           title: 'Sign in page',
                           isDone: false,
                        },
                        {
                           id: uuid(),
                           title: 'Welcome page',
                           isDone: false,
                        },
                     ],
                  },
                  {
                     id: uuid(),
                     title: 'Research pricing points of various competitors and trial different business models',
                     description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Research competitor pricing and business models',
                           isDone: true,
                        },
                        {
                           id: uuid(),
                           title: 'Outline a business model that works for our solution',
                           isDone: false,
                        },
                        {
                           id: uuid(),
                           title: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                           isDone: false,
                        },
                     ],
                  },
               ],
            },
            {
               id: uuid(),
               name: 'Todo',
               tasks: [
                  {
                     id: uuid(),
                     title: 'Design onboarding flow',
                     description: '',
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Sign up page',
                           isDone: true,
                        },
                        {
                           id: uuid(),
                           title: 'Sign in page',
                           isDone: false,
                        },
                        {
                           id: uuid(),
                           title: 'Welcome page',
                           isDone: false,
                        },
                     ],
                  },
                  {
                     id: uuid(),
                     title: 'Research pricing points of various competitors and trial different business models',
                     description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Research competitor pricing and business models',
                           isDone: true,
                        },
                        {
                           id: uuid(),
                           title: 'Outline a business model that works for our solution',
                           isDone: false,
                        },
                        {
                           id: uuid(),
                           title: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                           isDone: false,
                        },
                     ],
                  },
               ],
            },
         ]
      }
   ],
};
export const initialState: BoardState = {activeBoard: 0, boards: []}

const emptyColumn = {
   id: uuid
}

export const boardReducer = createReducer(
   initialState,
   on(getStateFromLocalStorage, (state) => {
      if (typeof window !== 'undefined') {
         let state = JSON.parse(localStorage.getItem('board') || "{}");
         if (Object.keys(state).length === 0) return defaultState;
         return state;
      }
      return initialState;
   }),
   on(create, (state, payload) => {
      // console.log('payload', payload)
      let newBoard: BoardState = {
         activeBoard: state.boards.length,
         boards: [...state.boards, {id: uuid(), name: payload.name, columns: payload.columns}]
      }
      // console.log('newBoard', newBoard)
      if (typeof window === 'undefined') {
         // console.log('tidak ada window di boardReducer')
      } else {
         // console.log('ada window di boardReducer')
         localStorage.setItem('board', JSON.stringify( newBoard ))
      }
      return newBoard;
   }),
   on(newColumn, (state, {columnNames, ids}) => {
      const filteredColumns = state.boards[state.activeBoard].columns.filter ( c => {
         return ids.has(c.id)
      });
      const newColumns: Column[] = [];
      columnNames.forEach( (name, index) => {
         if (index >= filteredColumns.length) {
            newColumns.push({
               id: uuid(),
               name, 
               tasks: []
            })
         } else {
            newColumns.push({...filteredColumns[index], name})
         }
      });

      let newBoard = {...state.boards[state.activeBoard]};
      newBoard.columns = newColumns;
      let newBoards = [...state.boards];
      newBoards[state.activeBoard] = newBoard;
      const newState = {...state, boards: newBoards};
      localStorage.setItem('board', JSON.stringify(newState));
      return newState;
   }),
   on(editBoard, (state, {boardName, columnNames, ids}) => {
      const filteredColumns = state.boards[state.activeBoard].columns.filter( c => {
         return ids.has(c.id)
      });
      const newColumns: Column[] = [];
      columnNames.forEach( (name, index) => {
         if (index >= filteredColumns.length) {
            newColumns.push({
               id: uuid(),
               name, 
               tasks: []
            })
         } else {
            newColumns.push({...filteredColumns[index], name})
         }
      });

      let newBoard = {...state.boards[state.activeBoard]};
      newBoard.columns = newColumns;
      newBoard.name = boardName;
      let newBoards = [...state.boards];
      newBoards[state.activeBoard] = newBoard;
      const newState = {...state, boards: newBoards};
      localStorage.setItem('board', JSON.stringify(newState));
      return newState;
   }),
   on(setActiveBoard, (state, {index}) => {
      const newState = {...state, activeBoard: index};
      localStorage.setItem('board', JSON.stringify(newState))
      return newState
   }),
   on(deleteBoard, (state) => {
      const newBoards = state.boards.filter( (b, i) => i !== state.activeBoard);
      const newState = {boards: newBoards, activeBoard: 0};
      localStorage.setItem('board', JSON.stringify(newState))
      return newState;
   }),
   on(addTask, (state, {title, description, subtasks, status}) => { 
      let newState: BoardState = JSON.parse(JSON.stringify(state));

      newState.boards[state.activeBoard].columns[Number(status)].tasks.push({
         id: uuid(),
         title,
         description,
         subtasks: subtasks.map( s => ({
            id: uuid(),
            title: s,
            isDone: false
         }))
      })
      localStorage.setItem('board', JSON.stringify(newState));
      return newState;
   }),
   on(moveColumn, (state, {prevIndex, newIndex, taskIndex}) => {
      if (prevIndex === newIndex) return state;
      let newState : BoardState= JSON.parse(JSON.stringify(state));
      let task = newState.boards[newState.activeBoard].columns[prevIndex].tasks.splice(taskIndex, 1)[0];
      newState.boards[newState.activeBoard].columns[newIndex].tasks.push(task);
      localStorage.setItem('board', JSON.stringify(newState));
      return newState;
   }),
   on(toggleSubtask, (state, {columnIndex, taskIndex, subtaskIndex}) => {
      let newState: BoardState = JSON.parse(JSON.stringify(state));
      newState.boards[newState.activeBoard].columns[Number(columnIndex)].tasks[Number(taskIndex)].subtasks[Number(subtaskIndex)].isDone = !newState.boards[newState.activeBoard].columns[Number(columnIndex)].tasks[Number(taskIndex)].subtasks[Number(subtaskIndex)].isDone;

      localStorage.setItem('board', JSON.stringify(newState));
      
      return newState;
   }),
   on(deleteTask, (state, {columnIndex, taskIndex}) => {
      let newState = {...state};
      let boards = [...newState.boards];
      let board = {...boards[newState.activeBoard]};
      let columns = [...board.columns];
      let column = {...columns[Number(columnIndex)]};
      let tasks = [...column.tasks];
      tasks.splice(Number(taskIndex), 1);
      column.tasks = tasks;
      columns[Number(columnIndex)] = column;
      board.columns = columns;
      boards[state.activeBoard] = board;
      newState.boards = boards
      localStorage.setItem('board', JSON.stringify(newState));
      return newState;
   }),
   on(editTask, (state, {title, description, subtasks, status, columnIndex, taskIndex}) => {
      let newState: BoardState = JSON.parse(JSON.stringify(state));

      // console.log('editTask()')
      // console.log('title', title)
      // console.log('description', description)
      // console.log('subtasks', subtasks)
      // console.log('status', status)
      // console.log('columnIndex', columnIndex)
      // console.log('taskIndex', taskIndex)
      
      
      let newColumnIndex = 0;
      // let newColumn = newState.boards[state.activeBoard].columns.find( (c, idx) => {
      //    if (c.id === status) {
      //       newColumnIndex = idx;
      //       return true;
      //    }
      //    return false;
      // });
      let newColumn = newState.boards[state.activeBoard].columns[Number(status)];
      // console.log('newColumn', newColumn);
      if (!newColumn) return state;
      
      if (status === columnIndex) {
         newState.boards[state.activeBoard].columns[Number(columnIndex)].tasks[Number(taskIndex)] = {
            id: uuid(),
            title,
            description,
            subtasks
         }
      } else {
         // move column [start]
            let task = newState.boards[state.activeBoard].columns[Number(columnIndex)].tasks.splice(Number(taskIndex), 1)[0];
            // edit task [start]
         task.title = title;
         task.description = description;
         task.subtasks = subtasks
            // edit task [end]
         newColumn.tasks.push(task);
         newState.boards[state.activeBoard].columns[Number(status)] = newColumn;
      }
      // move column [end]
      localStorage.setItem('board', JSON.stringify(newState));

      return newState;
   }),
   on(swapTask, (state, {fromColumnIndex, toColumnIndex, fromIndex, toIndex}) => {
      let newState: BoardState = JSON.parse(JSON.stringify(state));
      const board: Board = newState.boards[newState.activeBoard];
      // this.board.columns[colIndex].tasks
      if (toColumnIndex === null && fromIndex === toIndex) {
         return newState;
      } else if (fromColumnIndex === toColumnIndex || toColumnIndex === null) {
         // same column
         if (toIndex > fromIndex) { // drag ke bawah
            // console.log('drag ke bawah');
            const newTasks = board.columns[fromColumnIndex].tasks.map((t, index) => {
               if (index > toIndex || index < fromIndex) return t; // stay in the place
               if (index == toIndex) return board.columns[fromColumnIndex].tasks[fromIndex]; // dragged card
               if (index >= fromIndex){ 
                  // console.log('index >= fromIndex');
                  return board.columns[fromColumnIndex].tasks[index + 1]};
               return t;
            })
            // console.log('newTasks', newTasks);
            if (newTasks !== undefined) {
               newState.boards[newState.activeBoard].columns[fromColumnIndex].tasks = newTasks;
            }
            localStorage.setItem('board', JSON.stringify(newState));
            return newState;
         } else if (toIndex < fromIndex) { // drag ke atas
            // console.log('drag ke atas')
            const newTasks = board.columns[fromColumnIndex].tasks.map((t, index) => {
               if (index < toIndex || index > fromIndex) return t
               if (index == toIndex) return board.columns[fromColumnIndex].tasks[fromIndex] 
               if (index <= fromIndex) return board.columns[fromColumnIndex].tasks[index - 1]
               return t;
            })
            newState.boards[newState.activeBoard].columns[fromColumnIndex].tasks = newTasks;
            // console.log('newTasks', newTasks);
            localStorage.setItem('board', JSON.stringify(newState));
            return newState;
         }
      } else {
         // different columns
         const theTask = board.columns[fromColumnIndex].tasks.splice(fromIndex, 1)[0];
         board.columns[toColumnIndex].tasks.splice(toIndex, 0, theTask)
      }
      localStorage.setItem('board', JSON.stringify(newState));
      return newState;
   })
);