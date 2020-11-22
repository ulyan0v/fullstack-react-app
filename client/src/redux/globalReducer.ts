import themes from '../themes';
import {User} from '../utils/Types';
import {Theme} from "@material-ui/core";
import defaultAvatar from '../assets/default_avatar.jpg';

export const STORAGE_NAME = 'userdata';

const userdata = localStorage.getItem(STORAGE_NAME);
const {token} = userdata ? JSON.parse(userdata) : {token: null};

const initialState = {
  token: token as string | null,
  currentUser: null as User | null,
  theme: themes.dark as Theme,
  darkMode: true
};

type State = typeof initialState;

export const globalReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      if (!action.payload.avatar) action.payload.avatar = defaultAvatar;
      return {...state, currentUser: action.payload};

    case "LOGIN":
      localStorage.setItem(STORAGE_NAME, JSON.stringify(action.payload));
      return {
        ...state,
        token: action.payload.token
      };

    case "LOGOUT":
      localStorage.removeItem(STORAGE_NAME);
      return {
        ...state,
        token: null,
        currentUser: null
      };

    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.darkMode ? themes.light : themes.dark,
        darkMode: !state.darkMode
      };

    default: return state;
  }
}

const actions = {
  setCurrentUser: (user: User) => ({type: 'SET_CURRENT_USER', payload: user} as const),
  login: (id: string, token: string) => ({type: 'LOGIN', payload: {id, token}} as const),
  logout: () => ({type: 'LOGOUT'} as const),
  toggleTheme: () => ({type: 'TOGGLE_THEME'} as const)
};

type Action = ReturnType<typeof actions extends {[key: string]: infer U} ? U : never>;

export default actions;