export default (state = {}, action: any) => {
    switch (action.type) {
        case 'SET_USER_CHATS':
            console.log(action.chats)
            return action.chats;
        case 'SET_ERROR_USERS_CHATS':
            return action.error;
        default:
            return state;
    }
};
