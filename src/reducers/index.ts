import authReducer, { AuthState } from './authReducer';
import {combineReducers, Reducer} from "redux";

export interface State {
    auth: AuthState;
};

const rootReducer: Reducer<State> = combineReducers({
    auth: authReducer,
});

export default rootReducer;