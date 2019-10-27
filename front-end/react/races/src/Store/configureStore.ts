import {createStore, combineReducers, applyMiddleware, Reducer} from "redux";
import usersReducer from '../Reducers/users';
import isLoadingReducer from '../Reducers/isLoading';
import userReducer from '../Reducers/user';
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

export const rootReducer = combineReducers({
    users: usersReducer,
    isLoading: isLoadingReducer,
    user: userReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
