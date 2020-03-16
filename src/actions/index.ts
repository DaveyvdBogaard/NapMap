/* Authentication constants */
export const AUTH_USER_SET = 'AUTH_USER_SET';
export const AUTH_SIGN_UP = 'AUTH_SIGN_UP';
export const AUTH_SIGN_IN = 'AUTH_SIGN_IN';
export const AUTH_SIGN_OUT = 'AUTH_SIGN_OUT';
export const AUTH_LOADING = 'AUTH_LOADING';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_ERROR_DISMISS = 'AUTH_ERROR_DISMISS';

/* Order constants */
export const ORDER_NEW = 'ORDER_NEW';
export const ORDER_FETCH_ALL = 'ORDER_FETCH_ALL';
export const ORDER_FETCHED_ALL = 'ORDER_FETCHED_ALL';
export const ORDER_LOADING = 'ORDER_LOADING';
export const ORDER_ERROR = 'ORDER_ERROR';
export const ORDER_ERROR_DISMISS = 'ORDER_ERROR_DISMISS';

function action(type: any, payload = {}) {
    return {type, ...payload}
}

/* Authentication actions */
export const signUp = (payload: any) => action(AUTH_SIGN_UP, {payload});
export const signIn = (payload: any) => action(AUTH_SIGN_IN, {payload});
export const signOut = () => action(AUTH_SIGN_OUT);
export const dismissAuthError = () => action(AUTH_ERROR_DISMISS);

/* Order actions */
export const fetchOrders = (payload: any) => action(ORDER_FETCH_ALL, {payload});
export const dismissOrderError = () => action(ORDER_ERROR_DISMISS);