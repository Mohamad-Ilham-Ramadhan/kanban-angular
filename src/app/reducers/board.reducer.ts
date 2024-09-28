import { createReducer, on } from "@ngrx/store";
import { v4 as uuid } from 'uuid';
import { create, deleteBoard, editBoard, getStateFromLocalStorage, newColumn, setActiveBoard, addTask, moveColumn} from "../actions/board.action";

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
export const initialState: BoardState = {
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
}

const emptyColumn = {
   id: uuid
}

export const boardReducer = createReducer(
   initialState,
   on(getStateFromLocalStorage, (state) => {
      if (typeof window !== 'undefined') {
         let state = JSON.parse(localStorage.getItem('board') || "{}");
         if (Object.keys(state).length === 0) return initialState;
         return state;
      }
      return initialState;
   }),
   on(create, (state, payload) => {
      console.log('payload', payload)
      let newBoard: BoardState = {
         activeBoard: state.boards.length,
         boards: [...state.boards, {id: uuid(), name: payload.name, columns: payload.columns}]
      }
      console.log('newBoard', newBoard)
      if (typeof window === 'undefined') {
         console.log('tidak ada window di boardReducer')
      } else {
         console.log('ada window di boardReducer')
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
      const newState = {...state};
      if (!newState.boards[newState.activeBoard].columns.find( (c) => c.id === status)) return state;
      let theColumn: Column = {...newState.boards[newState.activeBoard].columns.find( (c) => c.id === status)} as Column;
      if (newState.boards[newState.activeBoard].columns.find( (c) => c.id === status)) {
         subtasks = subtasks.map( s => ({id: uuid(), title: s, isDone: false}))
   
         if (theColumn.tasks !== undefined) {
            const tasks = [...theColumn.tasks];
            tasks.push({
               id: uuid(),
               title,
               description,
               subtasks
            });
            theColumn.tasks = tasks;
         };
         const currentBoard = {...newState.boards[newState.activeBoard]};
         let columns = [...newState.boards[newState.activeBoard].columns];
         columns = columns.map((c, i) => {
            if (c.id === status) return theColumn
            return c;
         });
         currentBoard.columns = columns;
         let boards = [...newState.boards];
         boards = boards.map((b, i) => {
            if (b.id === currentBoard.id) return currentBoard
            return b
         })
         newState.boards = boards;
      }
      localStorage.setItem('board', JSON.stringify(newState))
      return newState;
   }),
   on(moveColumn, (state, {prevId, newId, taskId}) => {
      let prevColumn = {...state.boards[state.activeBoard].columns.find(c => c.id === prevId)}
      let newColumn = {...state.boards[state.activeBoard].columns.find( c => c.id === newId)}
      let task = prevColumn.tasks?.find( t => t.id === taskId);

      let newColumnTasks: Task[] = [];
      if (newColumn.tasks) {
         newColumnTasks = [...newColumn.tasks]
      }
      prevColumn.tasks = prevColumn.tasks?.filter( (t) => t.id !== taskId);
      if (task) {newColumnTasks?.push(task)}
      newColumn.tasks = newColumnTasks;
      let boardColumns = [...state.boards[state.activeBoard].columns].map( c => {
         if (c.id === newId) {
            return newColumn;
         } else if (c.id === prevId) {
            return prevColumn;
         } 
         return c;
      });
      let currentBoard = {...state.boards[state.activeBoard]};
      currentBoard.columns = boardColumns as Column[];
      let boards = [...state.boards];
      boards[state.activeBoard] = currentBoard;
      let newState = {...state};
      newState.boards = boards;
      // console.log('newState.boards[state.activeBoard]', Object.isSealed(newState.boards[state.activeBoard]))
      
      return newState;
   }),
);