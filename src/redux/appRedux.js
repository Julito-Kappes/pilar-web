const ADD_TODO = "ADD_TODO";
const COMPLETE_TODO = "COMPLETE_TODO";
const DELETE_TODO = "DELETE_TODO";

const stateInitial = {
  todo: [],
};

export const appSelector = {
  todo: (state) => state.todo,
};

//-----Acciones------
export const appActions = {
  addTodo: (payload) => ({
    type: ADD_TODO,
    payload,
  }),

  setCompletedTodo: (payload) => ({
    type: COMPLETE_TODO,
    payload,
  }),

  deleteTodo: (id) => ({
    type: DELETE_TODO,
    id,
  }),
};

//-------Reductor------

export const appReducer = (state = stateInitial, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todo: [
          ...state.todo,
          {
            id: action.payload.id,
            text: action.payload.text,
            completed: false,
          },
        ],
      };
    case COMPLETE_TODO:
      return {
        ...state,
        todo: state.todo.map((t) => {
          if (t.id === action.payload.id) {
            return {
              ...t,
              completed: action.payload.completed,
            };
          }
          return t;
        }),
      };
    case DELETE_TODO:
      return {
        ...state,
        todo: state.todo.filter((t) => t.id !== action.id),
      };
    default:
      return state;
  }
};
