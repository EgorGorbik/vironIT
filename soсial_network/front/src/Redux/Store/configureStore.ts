import {createStore, combineReducers, applyMiddleware, Reducer} from "redux";
import thunk from "redux-thunk";
import isLogingReducer from '../Reducers/isLogin.reducer';
import usersReducer from '../Reducers/users.reducer';
import isLoadingReducer from '../Reducers/isLoading.reducer';
import userReducer from '../Reducers/user.reducer';
import authUserReducer from '../Reducers/atuhUser.reducer';
import {composeWithDevTools} from "redux-devtools-extension";
import chatsReducer from '../Reducers/chats.reducer';
import chatReducer from '../Reducers/chat.reducer';

export const rootReducer = combineReducers({
    isLogin: isLogingReducer,
    users: usersReducer,
    user: userReducer,
    isLoading: isLoadingReducer,
    authUser: authUserReducer,
    chats: chatsReducer,
    chat: chatReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
