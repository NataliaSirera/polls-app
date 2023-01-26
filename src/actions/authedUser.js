import { authenticate } from "../utils/api";

export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const LOGOUT_AUTHED_USER = "LOGOUT_AUTHED_USER";

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

export function logoutAuthedUser() {
  return {
    type: LOGOUT_AUTHED_USER,
  };
}

export function handleLogin(username, password) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      authenticate(username, password)
        .then(() => {
          dispatch(setAuthedUser(username));
          resolve();
        })
        .catch(() => reject());
    });
  };
}

export function handleLogout() {
  return (dispatch) => {
    return dispatch(logoutAuthedUser());
  };
}
