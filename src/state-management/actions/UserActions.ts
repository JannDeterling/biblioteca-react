import {User} from "../../models/User";

export const UPDATE_USER_ACTION = "UPDATE_USER";
export const LOGIN_USER_ACTION = "LOGIN";
export const LOGOUT_USER_ACTION = "LOGOUT";

export interface UserAction {
    type: string;
    payload: User | boolean;
}

export const updateUser = (user: User): UserAction => {
    return {type: UPDATE_USER_ACTION, payload: user};
};

export const loginUser = (user: User): UserAction => {
    return {type: LOGIN_USER_ACTION, payload: user};
};

export const logoutUser = (isLoggedOut: boolean): UserAction => {
    return {type: LOGOUT_USER_ACTION, payload: isLoggedOut};
};