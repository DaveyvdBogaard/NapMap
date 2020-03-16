import { produce } from "immer";
import { AUTH_ERROR, AUTH_ERROR_DISMISS, AUTH_LOADING, AUTH_USER_SET, AUTH_SIGN_OUT } from "../actions";

export interface AuthState {
    user: any;
    loading: any;
    error: any;
}

const defaultState: AuthState = {
    user: null,
    loading: false,
    error: {
        enabled: false
    },
};

const authReducer = (state = defaultState, action: any): AuthState => {
    switch (action.type) {

        case AUTH_ERROR:
            return produce(state, draftState => {
                draftState.error = {
                    ...action.data
                }
                draftState.error.enabled = true
            });

        case AUTH_ERROR_DISMISS:
            return produce(state, draftState => {
                draftState.error = {
                    enabled: false
                }
            });

        case AUTH_LOADING:
            return produce(state, draftState => {
                draftState.loading = action.data;
            });

        case AUTH_USER_SET:
            return produce(state, draftState => {
                draftState.user = action.data;
            });

        case AUTH_SIGN_OUT:
            return produce(state, draftState => {
                draftState.user = null;
            })

        default:
            return state;
    }
};

export default authReducer;