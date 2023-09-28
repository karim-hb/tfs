import * as types from "../constant";

export const handleLoginAction = (userData) => async (dispatch, getState) => {
  try {
  } catch (error) {}
};

export const handleThemeToggle = (data) => async (dispatch, getState) => {
  localStorage.setItem("theme", data);

  dispatch({
    type: types.THEME,
    payload: data,
  });
};
export const handleLogout = (data) => async (dispatch, getState) => {
  dispatch({
    type: types.USER_LOGOUT,
  });
};
