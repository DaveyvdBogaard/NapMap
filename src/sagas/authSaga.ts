import { all, put, fork, take, call } from "redux-saga/effects";
import * as actions from "../actions";

function* watchSignUp() {
  while (true) {
    const { payload } = yield take(actions.AUTH_SIGN_UP);
    yield put({ type: actions.AUTH_LOADING, data: true });
    const { response, error } = yield call(
      signUp,
      payload.email,
      payload.password
    );
    if (response) {
      yield put({ type: "AUTH_USER_SET", data: response  });
    } else {
      yield put({ type: "AUTH_ERROR", data: error });
    }
    yield put({ type: actions.AUTH_LOADING, data: false });
  }
}

function* watchSignIn() {
  while (true) {
    const { payload } = yield take(actions.AUTH_SIGN_IN);
    yield put({ type: actions.AUTH_LOADING, data: true });
    const { response, error } = yield call(
      signIn,
      payload.email,
      payload.password
    );
    if (response) {
      yield put({ type: "AUTH_USER_SET", data: response });
    } else {
      yield put({ type: "AUTH_ERROR", data: error });
    }
    yield put({ type: actions.AUTH_LOADING, data: false });
  }
}

function* watchSignOut() {
  while (true) {
    yield take(actions.AUTH_SIGN_OUT);
    yield put({ type: actions.AUTH_LOADING, data: true });
    // sign out method here
    yield put({ type: actions.AUTH_LOADING, data: false });
  }
}

function signUp(email: any, password: any) {
  // sign up method here
}

function signIn(email: any, password: any) {
  // sign in method here
}

export default function* authSaga() {
  yield all([
    fork(watchSignUp),
    fork(watchSignIn),
    fork(watchSignOut)
  ]);
}
