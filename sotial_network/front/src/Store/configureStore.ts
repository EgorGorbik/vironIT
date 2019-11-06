import {createStore, combineReducers, applyMiddleware, Reducer} from "redux";
import thunk from "redux-thunk";
import isLogingReducer from '../Reducers/isLogin.reducer';
import usersReducer from '../Reducers/users.reducer';
import isLoadingReducer from '../Reducers/isLoading.reducer';
import userReducer from '../Reducers/user.reducer';
import {composeWithDevTools} from "redux-devtools-extension";

export const rootReducer = combineReducers({
    isLogin: isLogingReducer,
    users: usersReducer,
    user: userReducer,
    isLoading: isLoadingReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
