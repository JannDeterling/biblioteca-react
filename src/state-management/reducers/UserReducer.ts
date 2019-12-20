import {LOGIN_USER_ACTION, LOGOUT_USER_ACTION, UPDATE_USER_ACTION, UserAction} from "../actions/UserActions";
import {User} from "../../models/User";

const initialState: User = {
    username: "",
    id: -1,
    isLoggedIn: false,
    checkedOutBooks: []
};


export const userReducer = (state: User = initialState, action: UserAction): User => {
    switch (action.type) {
        case UPDATE_USER_ACTION:
            return action.payload as User;
        case LOGIN_USER_ACTION:
            return logInUser(state, action.payload as User);
        case LOGOUT_USER_ACTION:
            return logOutUser(state, action.payload as boolean);
        default:
            return state;
    }
};

const logOutUser = (state: User, isLoggedOut: boolean): User => {
    if (isLoggedOut) {
        return Object.assign({}, initialState);
    } else {
        return state
    }
};

const logInUser = (state: User, user: User | undefined): User => {
    if (user) {
        return Object.assign({}, user);
    } else {
        return state
    }
};