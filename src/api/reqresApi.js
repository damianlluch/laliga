import { setToken } from "../helpers/auth";

export const loginApi = async (data) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/login`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    const { token } = result;
    token && (await setToken(token));
    return result;
  } catch (error) {
    return error.message + " - " + error.code;
  }
};
export const getUserApi = async (data) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/users/${data}`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error.message + " - " + error.code;
  }
};
export const getUsersApi = async (current) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/users/?page=${current}`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error.message + " - " + error.code;
  }
};
export const deleteUserApi = async (data) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/users/${data}`, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error.message + " - " + error.code;
  }
};
export const editUserApi = async (id, data) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/users/${id}`, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error.message + " - " + error.code;
  }
};
