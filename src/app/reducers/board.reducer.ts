import { createReducer, on } from "@ngrx/store";
import { v4 as uuid } from 'uuid';
import { createNewBoard, deleteBoard, editBoard, getStateFromLocalStorage, newColumn, setActiveBoard, addTask, moveColumn, toggleSubtask, deleteTask, editTask, swapTask} from "../actions/board.action";

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

const defaultState: BoardState = {
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
                     title: 'Build UI for onboarding flow',
                     description: '',
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Sign up page',
                           isDone: true
                        },
                        {
                           id: uuid(),
                           title: 'Sign in page',
                           isDone: false
                        },
                        {
                           id: uuid(),
                           title: 'Welcome page',
                           isDone: true
                        },
                     ]
                  },
                  {
                     id: uuid(),
                     title: 'Build UI for Search',
                     description: '',
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Search page',
                           isDone: false
                        },
                     ]
                  },
                  {
                     id: uuid(),
                     title: 'Build settings UI',
                     description: '',
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Account page',
                           isDone: true
                        },
                        {
                           id: uuid(),
                           title: 'Billing page',
                           isDone: false
                        },
                     ]
                  },
                  {
                     id: uuid(),
                     title: 'QA and test all major user journeys',
                     description: 'Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.',
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Internal testing',
                           isDone: true
                        },
                        {
                           id: uuid(),
                           title: 'External testing',
                           isDone: false
                        },
                     ]
                  },

               ],
            },
            {
               id: uuid(),
               name: 'Doing',
               tasks: [
                  {
                     id: uuid(),
                     title: 'Design settings and search pages',
                     description: '',
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Settings - Account page',
                           isDone: true
                        },
                        {
                           id: uuid(),
                           title: 'Settings - Billing page',
                           isDone: true
                        },
                        {
                           id: uuid(),
                           title: 'Search page',
                           isDone: false
                        },
                     ],
                  },
                  {
                     id: uuid(),
                     title: 'Add account management endpoints',
                     description: '',
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Upgrade plan',
                           isDone: true
                        },
                        {
                           id: uuid(),
                           title: 'Cancel plan',
                           isDone: true
                        },
                        {
                           id: uuid(),
                           title: 'Update payment method',
                           isDone: false
                        },
                     ],
                  },
                  {
                     id: uuid(),
                     title: 'Design onboarding flow',
                     description: '',
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Sign up page',
                           isDone: true
                        },
                        {
                           id: uuid(),
                           title: 'Sign in page',
                           isDone: false
                        },
                        {
                           id: uuid(),
                           title: 'Welcome page',
                           isDone: false
                        },
                     ],
                  },
                  {
                     id: uuid(),
                     title: 'Add search enpoints',
                     description: '',
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Add search endpoint',
                           isDone: true
                        },
                        {
                           id: uuid(),
                           title: 'Define search filters',
                           isDone: false
                        },
                     ],
                  },
                  {
                     id: uuid(),
                     title: 'Add authentication endpoints',
                     description: '',
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Define user model',
                           isDone: true
                        },
                        {
                           id: uuid(),
                           title: 'Add auth endpoints',
                           isDone: false
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
                           isDone: true
                        },
                        {
                           id: uuid(),
                           title: 'Outline a business model that works for our solution',
                           isDone: false
                        },
                        {
                           id: uuid(),
                           title: 'Talk to potential customers about our proposed solution and a sk for fair price expectancy',
                           isDone: false
                        },

                     ],
                  },
               ]
            },
            {
               id: uuid(),
               name: 'Done',
               tasks: [
                  {
                     id: uuid(),
                     title: 'Conduct 5 wireframe tests',
                     description: 'Ensure the layout continues to make sense and we have strong buy-in from potential users.',
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'complete 5 wireframe prototype tests',
                           isDone: true,
                        }
                     ]
                  },
                  {
                     id: uuid(),
                     title: 'Create wireframe prototype',
                     description: 'Create a greyscale clickable wireframe prototype to test our asssumptions so far.',
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Create clickable wireframe prototype in Balsamiq',
                           isDone: true,
                        }
                     ]
                  },
                  {
                     id: uuid(),
                     title: 'Review results of usability tests and iterate',
                     description: "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Meet to review notes from previous tests and plan changes',
                           isDone: true,
                        },
                        {
                           id: uuid(),
                           title: 'Make changes to paper prototypes',
                           isDone: true,
                        },
                        {
                           id: uuid(),
                           title: 'Conduct 5 usability tests',
                           isDone: true,
                        },
                     ]
                  },
                  {
                     id: uuid(),
                     title: 'Create paper prototypes and conduct 10 usability tests with potential customers',
                     description: "",
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Create paper prototype for version one',
                           isDone: true,
                        },
                        {
                           id: uuid(),
                           title: 'Complete 10 usability tests',
                           isDone: true,
                        },
                     ]
                  },
                  {
                     id: uuid(),
                     title: 'Market discovery',
                     description: "We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP",
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Interview 10 prospective customers',
                           isDone: true,
                        },
                     ]
                  },
                  {
                     id: uuid(),
                     title: 'Competitor analysis',
                     description: "",
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Find direct and indirect competitors',
                           isDone: true,
                        },
                        {
                           id: uuid(),
                           title: 'SWOT analysis for each competitor',
                           isDone: true,
                        },

                     ]
                  },
                  {
                     id: uuid(),
                     title: 'Research the market',
                     description: "We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.",
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Write up research analysis',
                           isDone: true,
                        },
                        {
                           id: uuid(),
                           title: 'Calculate TAM',
                           isDone: true,
                        },

                     ]
                  },
               ]
            },
         ]
      },
      {
         id: uuid(),
         name: 'Marketing Plan',
         columns: [
            {
               id: uuid(),
               name: 'Todo',
               tasks: [
                  {
                     id: uuid(),
                     title: 'Plan Product Hunt launch',
                     description: '',
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Find hunter',
                           isDone: false,
                        },
                        {
                           id: uuid(),
                           title: 'Gather assets',
                           isDone: false,
                        },
                        {
                           id: uuid(),
                           title: 'Draft product page',
                           isDone: false,
                        },
                        {
                           id: uuid(),
                           title: 'Notify customers',
                           isDone: false,
                        },
                        {
                           id: uuid(),
                           title: 'Notify network',
                           isDone: false,
                        },
                        {
                           id: uuid(),
                           title: 'Launch!',
                           isDone: false,
                        },
                     ],
                  },
                  {
                     id: uuid(),
                     title: 'Share on Show HN',
                     description: '',
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Draft out HN post',
                           isDone: false,
                        },
                        {
                           id: uuid(),
                           title: 'Get feedback and refine',
                           isDone: false,
                        },
                        {
                           id: uuid(),
                           title: 'Publish post',
                           isDone: false,
                        },
                     ],
                  },
                  {
                     id: uuid(),
                     title: 'Write launch article to publish on multiple channels',
                     description: '',
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Write article',
                           isDone: false,
                        },
                        {
                           id: uuid(),
                           title: 'Publish on LinkedIn',
                           isDone: false,
                        },
                        {
                           id: uuid(),
                           title: 'Publish on Indie Hackers',
                           isDone: false,
                        },
                        {
                           id: uuid(),
                           title: 'Publish on Medium',
                           isDone: false,
                        },
                     ],
                  },
               ],
            },
            {
               id: uuid(),
               name: 'Doing',
               tasks: []
            }
         ]
      },
      {
         id: uuid(),
         name: 'Roadmap',
         columns: [
            {
               id: uuid(),
               name: 'Now',
               tasks: [
                  {
                     id: uuid(),
                     title: 'Launch version one',
                     description: '',
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Launch privately to our waitlist',
                           isDone: false
                        },
                        {
                           id: uuid(),
                           title: 'Launch publicly on PH, NH, etc.',
                           isDone: false
                        }
                     ],
                  },
                  {
                     id: uuid(),
                     title: 'Review early feedback and plan next steps for roadmap',
                     description: "Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.",
                     subtasks: [
                        {
                           id: uuid(),
                           title: 'Interview 10 customers',
                           isDone: false
                        },
                        {
                           id: uuid(),
                           title: 'Review common customer pain points and suggestions',
                           isDone: false,
                        },
                        {
                           id: uuid(),
                           title: 'Outline next steps for our roadmap',
                           isDone: false,
                        }
                     ],
                  },
               ]
            },
            {
               id: uuid(),
               name: 'Next',
               tasks: [],
            },
            {
               id: uuid(),
               name: 'Later',
               tasks: [],
            },

         ]
      }
   ]
}



export const initialState: BoardState = {activeBoard: 0, boards: []}


export const boardReducer = createReducer(
   defaultState,
   on(getStateFromLocalStorage, (state) => {
      if (typeof window !== 'undefined') {
         let state = JSON.parse(localStorage.getItem('board') || "{}");
         if (Object.keys(state).length === 0) {
            localStorage.setItem('board', JSON.stringify(defaultState))
            return defaultState;
         };
         return state;
      }
      return initialState;
   }),
   on(createNewBoard, (state, payload) => {
      // console.log('payload', payload)apa
      let newBoard: BoardState = {
         activeBoard: state.boards.length,
         boards: [...state.boards, {id: uuid(), name: payload.name.trim(), columns: payload.columns.map( c => ({...c, name: c.name.trim()}))}]
      }
      localStorage.setItem('board', JSON.stringify( newBoard ))
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
               name: name.trim(), 
               tasks: []
            })
         } else {
            newColumns.push({...filteredColumns[index], name: name.trim()})
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
               name: name.trim(), 
               tasks: []
            })
         } else {
            newColumns.push({...filteredColumns[index], name: name.trim()})
         }
      });

      let newBoard = {...state.boards[state.activeBoard]};
      newBoard.columns = newColumns;
      newBoard.name = boardName.trim();
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
         title: title.trim(),
         description: description.trim(),
         subtasks: subtasks.map( s => ({
            id: uuid(),
            title: s.trim(),
            isDone: false
         }))
      });

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
            title: title.trim(),
            description: title.trim(),
            subtasks: subtasks.map( st => ({...st, title: st.title.trim()})),
         }
      } else {
         // move column [start]
         let task = newState.boards[state.activeBoard].columns[Number(columnIndex)].tasks.splice(Number(taskIndex), 1)[0];
         // edit task [start]
         task.title = title.trim();
         task.description = description.trim();
         task.subtasks = subtasks.map( st => ({...st, title: st.title.trim()}))
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